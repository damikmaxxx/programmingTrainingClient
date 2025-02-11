import React, { useState } from 'react';
import styles from './ProjectSolution.module.css'; // Импорт стилей

const ProjectSolution = () => {
  const [solutions, setSolutions] = useState([
    {
      id: 1,
      author: 'User1',
      code: 'function sum(a, b) { return a + b; }',
      stars: 10,
      liked: false,
    },
    {
      id: 2,
      author: 'User2',
      code: 'const multiply = (a, b) => a * b;',
      stars: 5,
      liked: false,
    },
  ]);

  const handleLike = (id) => {
    setSolutions((prevSolutions) =>
      prevSolutions.map((solution) =>
        solution.id === id
          ? {
              ...solution,
              liked: !solution.liked,
              likes: solution.liked ? solution.likes - 1 : solution.likes + 1,
            }
          : solution
      )
    );
  };

  return (
    <div className={styles.projectSolutions}>
      <h2>Решения</h2>
      {solutions.map((solution) => (
        <div key={solution.id} className={styles.solutionCard + " dark-primary-color"}>
          <div className={styles.solutionHeader}>
            <span className={styles.author}>{solution.author}</span>

          </div>
          <pre className={styles.solutionCode}>
            <code>{solution.code}</code>
          </pre>
          <button
              className={`${styles.likeButton} ${solution.liked ? styles.liked : ''}`}
              onClick={() => handleLike(solution.id)}
            >
             <span className={styles.stars}> <img src="/images/star.svg" alt="" />{solution.stars}</span>
            </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectSolution;