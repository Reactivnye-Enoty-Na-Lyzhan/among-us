import { FC, memo } from 'react';
import useTheme from '@/hooks/useTheme';
import './ProfileThemeSlider.css';

const ProfileThemeSlider: FC = () => {
  const { setThemeFromClient, themeId } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isLight = event.target.checked;
    setThemeFromClient(isLight);
  };

  return (
    <label className="theme-slider" htmlFor="checkbox">
      <input
        className="theme-slider__checkbox"
        type="checkbox"
        id="checkbox"
        checked={themeId === 2}
        onChange={handleThemeChange}
      />
      <div className="theme-slider__switch"></div>
    </label>
  );
};
export default memo(ProfileThemeSlider);
