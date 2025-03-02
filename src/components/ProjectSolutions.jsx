import React, { useState } from 'react';
import styles from './ProjectSolution.module.css'; // Импорт стилей
import { FaComment, FaStar, FaChevronUp, FaChevronDown, FaPaperPlane } from 'react-icons/fa'; // Импорт иконок
import CodeEditor from "../components/UI/CodeEditor/CodeEditor";
const ProjectSolution = ({ solutions = [], sortedLang = "javascript" }) => {
  const [_solutions, setSolutions] = useState(solutions);
  const [expandedCode, setExpandedCode] = useState(null);
  const [newComment, setNewComment] = useState(""); // Состояние для нового комментария
  const [visibleComments, setVisibleComments] = useState({}); // Состояние для отслеживания количества видимых комментариев

  const showMoreComments = (id) => {
    setVisibleComments((prev) => ({
      ...prev,
      [id]: (prev[id] || 5) + 5, // Увеличиваем количество отображаемых комментариев на 5
    }));
  };

  const handleLike = (id) => {
    setSolutions((prevSolutions) =>
      prevSolutions.map((solution) =>
        solution.id === id
          ? {
            ...solution,
            liked: !solution.liked,
            stars: solution.liked ? solution.stars - 1 : solution.stars + 1,
          }
          : solution
      )
    );
  };

  const toggleComments = (id) => {
    setSolutions((prevSolutions) =>
      prevSolutions.map((solution) =>
        solution.id === id
          ? { ...solution, showComments: !solution.showComments }
          : solution
      )
    );
  };

  const handleCodeClick = (id) => {
    setExpandedCode((prevExpandedCode) =>
      prevExpandedCode === id ? null : id // Если уже раскрыт, то сворачиваем, иначе раскрываем
    );
  };

  const handleCommentSubmit = (id) => {
    if (newComment.trim()) {
      setSolutions((prevSolutions) =>
        prevSolutions.map((solution) =>
          solution.id === id
            ? {
              ...solution,
              comments: [
                ...solution.comments,
                {
                  author: "USERNAME", // Или ваш текущий автор
                  date: new Date().toLocaleString(),
                  text: newComment,
                },
              ],
            }
            : solution
        )
      );
      setNewComment(""); // Очищаем инпут после отправки
    }
  };

  return (
    <div className={styles.ProjectSolution}>
      {_solutions?.map((solution) => (
        <div key={solution.id} className={styles.solutionCard + " dark-primary-color"}>
          <div className={styles.solutionHeader}>
            <div className={styles.solutionHeader_info}>
              <div className={styles.commentAva}><img src="https://www.gravatar.com/avatar/?d=mp" alt="аватарка" /></div>
              <span className={styles.author}>{solution.author}</span>
            </div>
            <div
              onClick={() => handleCodeClick(solution.id)}
              className={styles.toggleIcon}
            >
              {expandedCode === solution.id ? <FaChevronUp /> : <FaChevronDown />}
            </div>

          </div>
          <div
            className={`${styles.codeWrapper} ${expandedCode === solution.id ? styles.active : ''}`}
          >
            <pre className={styles.solutionCode}>
              <CodeEditor
                language={sortedLang}
                initialCode={solution.code}
                isReadOnly={true}
                height={'auto'} // Высота меняется динамически
              />
            </pre>
          </div>
          <div className={styles.solutionActions}>
            <span
              onClick={() => handleLike(solution.id)}
              className={solution.liked ? styles.likedStars : ''}
            >
              <FaStar className={styles.starIcon} />{solution.stars}
            </span>
            <span className={styles.commentSection} onClick={() => toggleComments(solution.id)}>
              <FaComment className={styles.commentIcon} />

              <span className={styles.commentCount}>{solution.comments.length}</span>
            </span>
          </div>

          <div className={`${styles.comments} ${solution.showComments ? styles.commentsSectionShow : ''}`}>
            <div className={styles.commentsSection}>
              {solution?.comments?.slice(0, visibleComments[solution.id] || 5).map((comment, index) => (
                <div key={index} className={styles.comment}>
                  <div className={styles.commentAva}><img src="https://www.gravatar.com/avatar/?d=mp" alt="аватарка" /></div>
                  <div className={styles.commentContainer}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{comment.author}</span>
                      <span className={styles.commentDate}>{comment.date}</span>
                    </div>
                    <div className={styles.commentText}>{comment.text}</div>
                  </div>
                </div>
              ))}
            </div>
            {solution.comments.length > (visibleComments[solution.id] || 5) && (
              <div className={styles.showMoreComments} onClick={() => showMoreComments(solution.id)}>
                Показать больше
              </div>
            )}
            {/* Инпут для добавления нового комментария */}
            <div className={styles.newComment}>
              <div className={styles.newComment_img}>
                <img src="https://www.gravatar.com/avatar/?d=mp" alt="аватарка" />
              </div>
              <textarea
                className={styles.newComment__input}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)} // Обновление состояния при вводе
                placeholder="Напишите комментарий..."
                rows={3} // Количество видимых строк
              />
              <div
                className={`${styles.newComment__sendButton} ${newComment.trim() ? styles.active : ''}`}
                onClick={() => handleCommentSubmit(solution.id)} // Отправка комментария
              >
                <FaPaperPlane className={styles.sendIcon} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSolution;
