import { Radar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import styles from "./DefaultProfile.module.css";
import { FaEdit } from "react-icons/fa";
import ItemCounter from "../../Shared/ItemCounter/ItemCounter";
import ProfileEffect from '../../ProfileEffect';
import { getLevelInfo } from '../../../data/LEVEL_MAP';
import Modal from '../../UI/Modal/Modal';
import { useState } from 'react';
import ProfileEditModal from '../../Shared/ProfileEditModal/ProfileEditModal';
import { userAPI } from '../../../api/api';

ChartJS.register(...registerables);

export default function DefaultProfile({ avatar, name, stars, recentProjects, description, timeExpDiagram, skills, exp, projectTimes, bgStyles, selectedStyleId }) {
  const descriptionMin = description?.length > 150 ? description.slice(0, 150) + '...' : description;
  const { level, expOnCurrentLevel, progressPercentage, expToNextLevel } = getLevelInfo(exp);
  console.log(skills);
  console.log(timeExpDiagram)
  // Группировка данных по датам и усреднение значений опыта
  const groupedData = timeExpDiagram.reduce((acc, { date, experience }) => {
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(experience);
    return acc;
  }, {});
  console.log(groupedData)
  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));
  const groupedTimeExpDiagram = {
    date: sortedDates,
    experience: sortedDates.map(date => {
      const experiences = groupedData[date];
      return experiences.reduce((sum, exp) => sum + exp, 0) / experiences.length;
    })
  };

  console.log(groupedTimeExpDiagram);

  // Настройка данных для графика Line
  const lineData = {
    labels: groupedTimeExpDiagram.date,
    datasets: [
      {
        label: 'Получено опыта',
        data: groupedTimeExpDiagram.experience,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1
      }
    ]
  };
  skills = []
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


  const [showModal, setShowModal] = useState(false);

  // Открытие модалки
  const openModal = () => setShowModal(true);

  // Закрытие модалки
  const closeModal = () => setShowModal(false);
  const BackgroundStyles = () => <div className={styles.bg_styles}></div>;
  const handleConfirm = async (props) => {
    // Логика для обработки подтверждения действия
    console.log(props);

    try {
      const formData = new FormData();
      formData.append('username', props.values.nickname);
      formData.append('description', props.values.description);
      // formData.append('nicknameStyle', props.values.nicknameStyle);
      if (avatar) {
        formData.append('photo', props.avatar); // Добавляем аватар в FormData
      }
      console.log(formData.get('username'));
      await userAPI.updateProfile(formData);  // Отправляем данные на сервер
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
    closeModal();
  }


  
  return (
    <div className={styles.bg}>

      <div className={styles.bg_styles_wrapper}>
        <ProfileEffect selectedStyleId={selectedStyleId} className={styles.ava}>
          <BackgroundStyles />
        </ProfileEffect>
      </div>

      <ProfileEditModal
        user={{ name, description, avatar,name }}
        showModal={showModal}
        closeModal={closeModal}
        handleConfirm={handleConfirm}
      />
      <div className="container">
        <div className="row">

          <div className={"col-lg-8 " + styles.over}>
            <div className={`${styles.section} mb-3`}>
              <div className={styles.headerInfo}>
                <img className={styles.avatar} src={avatar} alt="Аватар" />
                <div className={styles.info}>
                  <h2 className={styles.name}>{name}</h2>
                  <p className={styles.description}>{descriptionMin}</p>
                  <div className={styles.statsContainer}>
                    <ItemCounter type={"coin"} />
                    <ItemCounter type={"star"} />
                  </div>
                </div>
                <button className={styles.editIcon} onClick={() => openModal()}>
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
                  <li key={index} className={styles.projectItem}>{project.project_name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={"col-lg-2 " + styles.over}>
            <div className={`${styles.section} mb-3 ${styles.alignCenter}`}>
              {level} УРОВЕНЬ
            </div>
          </div>
          <div className={"col-lg-10 " + styles.over}>
            <div className={`${styles.section} mb-3 ${styles.alignCenter}`}>
              <div className={styles.expContainer}>
                <div className={styles.expBar}>
                  <div
                    className={styles.expFill}
                    style={{ '--progress': `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <span className={styles.expText}> {expOnCurrentLevel} / {expToNextLevel} </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={"col-lg-8 " + styles.over}>
            <div className={styles.section}>
              <span className={styles.lineDiagram}><Line data={lineData} /></span>
              {timeExpDiagram.length !== 0 || <p className={styles.fullInfo}>Нет данных для отображения графика</p>}
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
