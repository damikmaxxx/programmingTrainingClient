import { useState, useEffect } from "react";
import { projectAPI } from "../api/api";
const useProjectSolutions = (projectId) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState({});

  // Загрузка решений и комментариев
  useEffect(() => {
    console.log("update projectId", projectId);
    async function fetchSolutions() {
      try {
        setLoading(true);
        const data = await projectAPI.getProjectComments(projectId);
        console.log(data);
        // Форматируем данные для компонента
        const formattedSolutions = data.map((solution) => ({
          id: solution.user_project,
          author: solution.user,
          code: solution.code,
          stars: solution.earned_stars,
          liked: false, // Лайк не поставлен по умолчанию
          comments: solution.comments.map((comment) => ({
            author: comment.user,
            text: comment.text,
            date: new Date().toLocaleString(), // Сервер не даёт дату, берём текущую
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
      console.log(response);
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
                    date: new Date().toLocaleString(),
                  },
                ],
              }
            : solution
        )
      );
      setNewComment("");
    } catch (err) {
      setError(
        err.response?.data?.error || "Ошибка при добавлении комментария"
      );
    }
  };
  console.log({
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
  });
  return {
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
