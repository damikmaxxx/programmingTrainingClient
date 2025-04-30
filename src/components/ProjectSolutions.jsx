import React, { useState } from 'react';
import styles from './ProjectSolution.module.css'; // Импорт стилей
import { FaComment, FaStar, FaChevronUp, FaChevronDown, FaPaperPlane } from 'react-icons/fa'; // Импорт иконок
import CodeEditor from "../components/UI/CodeEditor/CodeEditor";
import useProjectSolutions from '../hooks/useProjectSolution'; // Импорт вашего хука
import Loader from './UI/Loader/Loader';

const ProjectSolution = ({ projectId, sortedLang = "javascript" }) => {
  console.log(sortedLang)
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
  } = useProjectSolutions(projectId);
  const [expandedCode, setExpandedCode] = useState(null);

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

  return (
    <div className={styles.ProjectSolution}>
      {solutions?.map((solution) => (
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
              {solution.code === null ?
                <div className={styles.noCode}>Код отсутствует</div> :

                <CodeEditor
                  language={sortedLang.value}
                  isReadOnly={true}
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