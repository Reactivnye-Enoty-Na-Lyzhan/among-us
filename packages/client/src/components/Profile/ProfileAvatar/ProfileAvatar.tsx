import { ChangeEvent, FC, memo, useEffect } from 'react';
import { useLazyGetUserQuery } from '@/store/auth/auth.slice';
import { DEFAULT_RESOURCE_URL } from '@/utils/constants';
import placeholder from '../../../images/profile/man.png';
import { useChangeAvatarMutation } from '@/store/profile/profile.slice';
import './ProfileAvatar.css';

const ProfileAvatar: FC = () => {
  const [getUser, result] = useLazyGetUserQuery();
  const [changeAvatar] = useChangeAvatarMutation();

  useEffect(() => {
    getUser();
  }, []);

  const defaultAvatar = result.data
    ? `${DEFAULT_RESOURCE_URL}/${result.data.avatar}`
    : placeholder;

  const handleUploadAvatar = async (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const { files } = evt.target;
    const form = new FormData();
    if (!files || !files.length) return;

    form.append('image', files[0]);
    await changeAvatar(form);
    console.log('здесь?');
    await getUser('', false);
  };

  return (
    <div className="profile-avatar">
      <label className="profile-avatar__upload-area">
        <img
          src={defaultAvatar}
          alt="Аватар пользователя."
          className="profile-avatar__avatar"
        />
        <input
          className="profile-avatar__input"
          type="file"
          accept="image/*"
          onChange={handleUploadAvatar}
        />
      </label>
    </div>
  );
};

export default memo(ProfileAvatar);
