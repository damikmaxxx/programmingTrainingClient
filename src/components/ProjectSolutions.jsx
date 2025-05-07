import React, { useState } from 'react';
import styles from './ProjectSolution.module.css'; // Импорт стилей
import { FaComment, FaStar, FaChevronUp, FaChevronDown, FaPaperPlane } from 'react-icons/fa'; // Импорт иконок
import CodeEditor from "../components/UI/CodeEditor/CodeEditor";
import useProjectSolutions from '../hooks/useProjectSolution'; // Импорт хука
import Loader from './UI/Loader/Loader';
import { DEFAULT_USER_IMAGE } from '../utils/consts'; // Импорт констант
import { useUserStore } from '../store/store'; // Импорт хранилища
import { GetStyleClassById } from '../data/ALL_STYLES';

const ProjectSolution = ({ projectId, sortedLang = { value: "python" } }) => {
  const { photo, name, role } = useUserStore(); // Извлекаем имя и роль пользователя
  const {
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
    deleteComment,
  } = useProjectSolutions(projectId);
  const [expandedCode, setExpandedCode] = useState(null);

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
    deleteComment,
  });

  const handleCodeClick = (id) => {
    setExpandedCode((prevExpandedCode) =>
      prevExpandedCode === id ? null : id // Если уже раскрыт, то сворачиваем, иначе раскрываем
    );
  };

  if (loading) {
    return <Loader fullPage={false} />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const getStyle = (styleId) => {
    console.log("styleId", styleId);
    const classStyle = GetStyleClassById(styleId);
    return classStyle;
  };

  return (
    <div className={styles.ProjectSolution}>
      {solutions?.map((solution) => (
        <div key={solution.id} className={styles.solutionCard + " dark-primary-color"}>
          <div className={styles.solutionHeader}>
            <div className={styles.solutionHeader_info}>
              <div className={styles.commentAva}><img src={solution.photo || DEFAULT_USER_IMAGE} alt="аватарка" /></div>
              <span className={styles.author + " " + getStyle(solution.nickname_id)}>{solution.author}</span>
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
              {solution.code === null ?
                <div className={styles.noCode}>Код отсутствует</div> :
                <CodeEditor
                  language={sortedLang.value}
                  isReadOnly={true}
                  initialCode={solution.code}
                />}
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
                  <div className={styles.commentAva}><img src={comment.photo || DEFAULT_USER_IMAGE} alt="аватарка" /></div>
                  <div className={styles.commentContainer}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor + " " + getStyle(comment.nickname_id)}>{comment.author}</span>
                      <span className={styles.commentDate}>{comment.date}</span>
                    </div>
                    <div className={styles.commentText}>{comment.text}</div>
                  </div>
                  {/* Показываем кнопку удаления для комментариев текущего пользователя или если пользователь — админ */}
                  {(comment.author === name || role === "admin") && (
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteComment(comment.id)}
                    >
                      ×
                    </button>
                  )}
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
                <img src={photo || DEFAULT_USER_IMAGE} alt="аватарка" />
              </div>
              <textarea
                className={styles.newComment__input}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Напишите комментарий..."
                rows={3}
              />
              <div
                className={`${styles.newComment__sendButton} ${newComment.trim() ? styles.active : ''}`}
                onClick={() => handleCommentSubmit(solution.id)}
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