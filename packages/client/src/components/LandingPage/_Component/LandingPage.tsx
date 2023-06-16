import PageFooter from '../Footer/_Component';
import PageHeader from '../Header/Header';
import PageMain from '../Main/Main';
import PageWallpaper from '../Wallpaper/Wallpaper';
import './LandingPage.css';

export function LandingPage() {
  return (
    <div className="landing-page">
      <PageWallpaper></PageWallpaper>
      <PageHeader></PageHeader>
      <PageMain></PageMain>
      <PageFooter></PageFooter>
    </div>
  );
}
