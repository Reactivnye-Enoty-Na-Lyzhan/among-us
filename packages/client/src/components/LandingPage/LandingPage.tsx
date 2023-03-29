import PageFooter from './Footer/Footer';
import PageHeader from './Header/Header';
import './LandingPage.css';
import PageMain from './Main/Main';
import PageWallpaper from './Wallpaper/Wallpaper';

export default function () {
  return (
    <div className="landing-page-container">
      <PageWallpaper></PageWallpaper>
      <PageHeader></PageHeader>
      <PageMain></PageMain>
      <PageFooter></PageFooter>
    </div>
  );
}
