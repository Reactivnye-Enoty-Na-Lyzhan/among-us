import { useState } from 'react';
import { useUpdateAvatarMutation } from '../../../store/profile/profile.slice';
import { useGetUserQuery } from '../../../store/auth/auth.slice';
import './ProfileAvatar.css';

const ProfileAvatar = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const { data, refetch } = useGetUserQuery();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setAvatar(file[0]);
      const formData = new FormData();
      formData.append('avatar', file[0]);
      updateAvatar(formData).then(() => {
        refetch();
      });
    }
  };
  
  return (
    <>
      <input
        className='avatar__button_space_right avatar__button'
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{
          backgroundImage: data?.avatar ? `url(https://ya-praktikum.tech/api/v2/resources${data.avatar})` : '',
        }}
      />
      {isLoading && <span>Updating Avatar...</span>}
    </>
  );
};

export default ProfileAvatar;
