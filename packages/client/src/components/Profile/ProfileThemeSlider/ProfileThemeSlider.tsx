import './ProfileThemeSlider.css';
import useTheme from '@/hooks/useTheme';

const ProfileThemeSlider: React.FunctionComponent = () => {
    const {setThemeFromClient, themeId} = useTheme();

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isLight = event.target.checked ;
        setThemeFromClient(isLight);
      };

    return (
        <div className="theme-slider">
        <label className="theme-slider__body" htmlFor="checkbox">
            <input className="theme-slider__checkbox" type="checkbox" id="checkbox" checked={themeId === 2}
          onChange={handleThemeChange} />
            <div className="theme-slider__switch"></div>
        </label>
    </div>
    );
};
export default ProfileThemeSlider;
