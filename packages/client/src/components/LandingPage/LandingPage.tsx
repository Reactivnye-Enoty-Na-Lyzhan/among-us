import PageFooter from './components/Footer';
import PageHeader from './components/Header';
import PageMain from './components/Main';
import PageWallpaper from './components/Wallpaper';
import './LandingPage.css';

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
