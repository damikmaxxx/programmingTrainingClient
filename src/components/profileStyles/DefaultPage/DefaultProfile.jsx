import { Radar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import styles from "./DefaultProfile.module.css";
import { FaEdit } from "react-icons/fa";
import ItemCounter from "../../Shared/ItemCounter/ItemCounter";
import FireEffect from "../../effects/FireEffect";
import ProfileEffect from '../../ProfileEffect';
ChartJS.register(...registerables);

export default function DefaultProfile({ avatar, name, stars, level, recentProjects, description, timeExpDiagram, skills, exp, projectTimes, bgStyles, selectedStyle }) {


  const radarData = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Навыки',
        data: skills.map(skill => skill.percentage),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const radarOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        max: 100,
      }
    }
  };

  const lineData = {
    labels: timeExpDiagram.time,
    datasets: [
      {
        label: 'Время решения (минуты)',
        data: timeExpDiagram.exp,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className={styles.bg}>
      <div className={styles.bg_styles_wrapper}>
        <ProfileEffect selectedStyle={selectedStyle} className={styles.ava}>
          <div className={styles.bg_styles}></div>
        </ProfileEffect>
      </div>
      <div className="container">
        <div className="row">
          <div className={"col-lg-8 " + styles.over}>
            <div className={`${styles.section} mb-3`}>
              <div className={styles.headerInfo}>
                <img className={styles.avatar} src={avatar} alt="Аватар" />
                <div className={styles.info}>
                  <h2 className={styles.name}>{name}</h2>
                  <p className={styles.description}>{description}</p>
                  <div className={styles.statsContainer}>
                    <ItemCounter type={"coin"} />
                    <ItemCounter type={"star"} />
                  </div>
                </div>
                <button className={styles.editIcon} onClick={() => alert("Редактирование профиля")}>
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
          <div className={"col-lg-4 " + styles.over}>
            <div className={styles.projects}>
              <h3 className={styles.sectionTitle}>Последние проекты</h3>
              <ul className={styles.projectList}>
                {recentProjects.map((project, index) => (
                  <li key={index} className={styles.projectItem}>{project}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={"col-lg-6 " + styles.over}>
            <div className={`${styles.section} mb-3 ${styles.alignCenter}`}>
              <div className={styles.activeSkillWr}>
                <p>Используемые языки:</p>
                <div className={styles.activeSkill}>
                  <span className="js-skill">JavaScript</span>
                  <span className="cpp-skill">C++</span>
                  <span className="python-skill">Python</span>
                </div>
              </div>
            </div>
          </div>
          <div className={"col-lg-6 " + styles.over}>
            <div className={`${styles.section} mb-3 ${styles.alignCenter}`}>
              <div className={styles.timeInfo}>
                Последний раз заходил: <span>16.02.2025</span>
                Регистрация <span>01.02.2025</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={"col-lg-2 " + styles.over}>
            <div className={`${styles.section} mb-3 ${styles.alignCenter}`}>
              5 УРОВЕНЬ
            </div>
          </div>
          <div className={"col-lg-10 " + styles.over}>
            <div className={`${styles.section} mb-3 ${styles.alignCenter}`}>
              <div className={styles.expContainer}>
                <div className={styles.expBar}>
                  <div
                    className={styles.expFill}
                    style={{ width: `${70}%` }}
                  ></div>
                </div>
              </div>
              <span className={styles.expText}> 700 / 1000 </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={"col-lg-8 " + styles.over}>
            <div className={styles.section}>
              <span className={styles.lineDiagram}><Line data={lineData} /></span>
            </div>
          </div>
          <div className={"col-lg-4 " + styles.over}>
            <div className={styles.section}>
              <span className={styles.radarDiagram}><Radar data={radarData} options={radarOptions} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
