import './ProfileAvatar.css';

const ProfileAvatar = () => {

  return (
      <input
        id='avatar__button'
        className='avatar__button_space_right'
        type="file"
        accept="image/*"
      />
  );
};

export default ProfileAvatar;
