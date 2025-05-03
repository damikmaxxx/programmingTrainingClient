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
import { useUserStore } from '../../../store/store';
import { GetStyleClassById } from '../../../data/ALL_STYLES';
import { STYLE_CATEGORY_NICKNAME, STYLE_CATEGORY_BACKGROUND_PROFILE } from '../../../api/user';
import { useNotification } from '../../Shared/NotificationProvider/NotificationProvider';
import { handleServerErrors } from '../../../utils/handleServerErrors/handleServerErrors';
import { DEFAULT_USER_IMAGE } from '../../../utils/consts';
ChartJS.register(...registerables);

export default function DefaultProfile({name, avatar, stars, recentProjects, description, timeExpDiagram, skills, exp, projectTimes, bgStyles, nicknameStyleId, selectedStyleId, isOwnProfile }) {
  const descriptionMin = description?.length > 150 ? description.slice(0, 150) + '...' : description;
  const { level, expOnCurrentLevel, progressPercentage, expToNextLevel } = getLevelInfo(exp);
  const { notify } = useNotification();
  console.log(skills);
  console.log(timeExpDiagram);

  // Группировка данных по датам и усреднение значений опыта
  const groupedData = timeExpDiagram?.reduce((acc, { date, experience }) => {
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(experience);
    return acc;
  }, {});
  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));
  const groupedTimeExpDiagram = {
    date: sortedDates,
    experience: sortedDates.map(date => {
      const experiences = groupedData[date];
      return experiences.reduce((sum, exp) => sum + exp, 0) / experiences.length;
    }),
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
        tension: 0.1,
      },
    ],
  };

  // Если skills пустой, задаём пустой массив
  const normalizedSkills = skills || [];

  // Подсчитываем общую сумму опыта
  const totalExperience = normalizedSkills.reduce((sum, skill) => sum + skill.experience, 0);

  // Определяем базовое значение для расчёта процентов: минимум 1000
  const baseExperience = Math.max(totalExperience, 1000);

  // Вычисляем процент для каждого навыка относительно baseExperience
  const skillsWithPercentage = normalizedSkills.map(skill => ({
    ...skill,
    percentage: (skill.experience / baseExperience) * 100,
  }));
  console.log(skillsWithPercentage);

  const radarData = {
    labels: skillsWithPercentage.map(skill => skill.language), // Используем language
    datasets: [
      {
        label: 'Навыки',
        data: skillsWithPercentage.map(skill => skill.percentage), // Используем проценты
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0, // Устанавливаем минимум шкалы
        max: 100, // Устанавливаем максимум шкалы на 100%
        ticks: {
          display: false, // Полностью убираем ticks (включая их визуальные элементы)
        },
        grid: {
          color: '#282C34', // Темнее светло-серого, но не слишком тёмный
          lineWidth: 2,
        },
        angleLines: {
          display: false, // Убираем радиальные линии от центра к меткам
        },
        pointLabels: {
          display: true, // Оставляем метки видимыми
          font: {
            size: 16, // Увеличиваем размер шрифта
            weight: 'bold', // Делаем шрифт жирнее (опционально)
          },
          color: '#f0f0f0', // Светлый цвет, почти белый, но мягче
        },
      },
    },
  };

  const [showModal, setShowModal] = useState(false);

  // Открытие модалки
  const openModal = () => setShowModal(true);

  // Закрытие модалки
  const closeModal = () => setShowModal(false);

  const BackgroundStyles = () => <div className={styles.bg_styles}></div>;

  const handleConfirm = async (props) => {
    console.log(props);

    try {
      let requestData;
      if (props.avatar) {
        const formData = new FormData();
        if (name !== props.values.nickname) {
          formData.append('username', props.values.nickname);
        }
        formData.append('description', props.values.description);
        formData.append('photo', props.avatar);
        requestData = formData;
        console.log(formData.get('username'));
      } else {
        requestData = {};
        if (name !== props.values.nickname) {
          requestData.username = props.values.nickname;
        }
        requestData.description = props.values.description;
      }

      // Обновляем профиль
      await userAPI.updateProfile(requestData);

      // Обновляем стили профиля и ника
      const profileStyleValue = props.values.profileStyle.value;
      const nicknameStyleValue = props.values.nicknameStyle.value;

      // Для стиля профиля
      if (profileStyleValue === '0') {
        await userAPI.updateUserStyle(0, STYLE_CATEGORY_BACKGROUND_PROFILE);
      } else {
        await userAPI.updateUserStyle(profileStyleValue);
      }

      // Для стиля ника
      if (nicknameStyleValue === '0') {
        await userAPI.updateUserStyle(0, STYLE_CATEGORY_NICKNAME);
      } else {
        await userAPI.updateUserStyle(nicknameStyleValue);
      }
    } catch (error) {
      console.error('Ошибка при обновлении профиля или стилей:', error.response?.data || error.message);
      handleServerErrors(error.response?.data, notify, {
        defaultMessage: 'Ошибка при обновлении профиля. Попробуйте снова.',
        fieldNames: {
          username: 'Имя пользователя',
          photo: 'Аватар',
          description: 'Описание',
          detail: 'Ошибка',
        },
      });
    }
    closeModal();
  };

  console.log(nicknameStyleId);
  const classStyle = GetStyleClassById(nicknameStyleId);
  console.log(classStyle);

  return (
    <div className={styles.bg}>
      <div className={styles.bg_styles_wrapper}>
        <ProfileEffect selectedStyleId={selectedStyleId} className={styles.ava}>
          <BackgroundStyles />
        </ProfileEffect>
      </div>

      <ProfileEditModal
        user={{ name, description, avatar }}
        showModal={showModal}
        closeModal={closeModal}
        handleConfirm={handleConfirm}
      />
      <div className="container">
        <div className="row">
          <div className={"col-lg-8 " + styles.over}>
            <div className={`${styles.section} mb-3`}>
              <div className={styles.headerInfo}>
                <img className={styles.avatar} src={avatar} alt="Аватар" onError={(e) => (e.target.src = DEFAULT_USER_IMAGE)}/>
                <div className={styles.info}>
                  <h2 className={styles.name + " " + classStyle}>{name}</h2>
                  <p className={styles.description}>{descriptionMin}</p>
                  {isOwnProfile && (
                    <div className={styles.statsContainer}>
                      <ItemCounter type="coin" />
                      <ItemCounter type="star" count={stars} />
                    </div>
                  )}
                </div>
                {isOwnProfile && (
                  <button className={styles.editIcon} onClick={() => openModal()}>
                    <FaEdit />
                  </button>
                )}
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