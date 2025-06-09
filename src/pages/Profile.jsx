import React from 'react';
import DefaultProfile from '../components/profileStyles/DefaultPage/DefaultProfile';
import Loader from '../components/UI/Loader/Loader';
import useProfileData from '../hooks/useProfileData';
import { useUserStore } from '../store/store';

function Profile({ testStyle = false }) {
  const { userData,isOwnProfile, isLoading, error } = useProfileData(testStyle);
  const {nicknameStyleId} =  useUserStore();
  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки данных: {error.message}</div>;
  return (
    <>
    <DefaultProfile
      avatar={userData.avatar}
      name={userData.name}
      coins={userData.coins}
      stars={userData.stars}
      exp={userData.exp}
      description={userData.description}
      recentProjects={userData.recentProjects}
      skills={userData.skills}
      timeExpDiagram={userData.timeExpDiagram}
      selectedStyleId={userData.selectedStyleId}
      nicknameStyleId={userData.nickname_id || nicknameStyleId}
      isOwnProfile={isOwnProfile}
    />
    </>
  );
}

export default Profile;
