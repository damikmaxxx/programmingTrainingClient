import { useState, useEffect } from "react";
import { projectAPI } from "../api/api";

import { useNotification } from "../components/Shared/NotificationProvider/NotificationProvider";
import { handleServerErrors } from "../utils/handleServerErrors/handleServerErrors";

const useProjectSolutions = (projectId) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState({});
  const { notify } = useNotification();
  async function fetchSolutions() {
    try {
      setLoading(true);
      const data = await projectAPI.getProjectComments(projectId);
      // Форматируем данные для компонента
      const formattedSolutions = data.map((solution) => ({
        id: solution.user_project,
        author: solution.user,
        code: solution.code,
        stars: solution.earned_stars,
        photo: solution.photo,
        nickname_id: solution.nickname_id,
        liked: false, // Лайк не поставлен по умолчанию
        comments: solution.comments.map((comment) => ({
          id: comment.comment_id,
          author: comment.user,
          text: comment.text,
          photo: comment.photo,
          nickname_id: comment.nickname_id,
          date: comment.date, // Сервер не даёт дату, берём текущую
        })),
        showComments: false,
        project: solution.project,
      }));
      setSolutions(formattedSolutions);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки решений");
    } finally {
      setLoading(false);
    }
  }
  // Загрузка решений и комментариев
  useEffect(() => {

    if (projectId) {
      fetchSolutions();
    }
  }, [projectId]);

  // Показать больше комментариев
  const showMoreComments = (id) => {
    setVisibleComments((prev) => ({
      ...prev,
      [id]: (prev[id] || 5) + 5,
    }));
  };

  // Переключение видимости комментариев
  const toggleComments = (id) => {
    setSolutions((prev) =>
      prev.map((solution) =>
        solution.id === id
          ? { ...solution, showComments: !solution.showComments }
          : solution
      )
    );
  };

  // Обработка лайка
  const handleLike = async (userProjectId) => {
    try {
      const response = await projectAPI.setLike(userProjectId);
      if (response.data) {
        setSolutions((prev) =>
          prev.map((solution) =>
            solution.id === userProjectId
              ? {
                  ...solution,
                  stars: response.data.earned_stars,
                  liked: true,
                }
              : solution
          )
        );
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка при установке лайка");
    }
  };

  // Отправка комментария
  const handleCommentSubmit = async (userProjectId) => {
    if (!newComment.trim()) return;
    try {
      const response = await projectAPI.writeComment(userProjectId, newComment);
      setSolutions((prev) =>
        prev.map((solution) =>
          solution.id === userProjectId
            ? {
                ...solution,
                comments: [
                  ...solution.comments,
                  {
                    author: response.user,
                    text: response.text,
                  },
                ],
              }
            : solution
        )
      );
      setNewComment("");
      notify("Комментарий успешно добавлен!", "success");
      fetchSolutions();
    } catch (err) {
      setError(err.response?.data || "Ошибка при добавлении комментария");
      handleServerErrors(err.response?.data, notify, {
        defaultMessage: "Ошибка при добавлении комментария. Попробуйте снова.",
        fieldNames: {
          text: "Комментарий",
          detail: "Ошибка",
        },
      });
    }
  };

  // Удаление комментария (новый метод)
  const deleteComment = async (commentId) => {
    try {
      await projectAPI.deleteComment(commentId); // Вызываем API для удаления
      setSolutions((prev) =>
        prev.map((solution) => ({
          ...solution,
          comments: solution.comments.filter(
            (comment) => comment.id !== commentId
          ), // Удаляем комментарий из списка
        }))
      );
    } catch (err) {
      console.error("Ошибка при удалении комментария:", err);
      // Здесь можно добавить уведомление через NotificationProvider
    }
  };

  return {
    deleteComment,
    solutions,
    setSolutions,
    loading,
    error,
    newComment,
    setNewComment,
    visibleComments,
    showMoreComments,
    toggleComments,
    handleLike,
    handleCommentSubmit,
  };
};

export default useProjectSolutions;
