import './TechnologyEntry.css';

type Props = {
  technologyWebsiteURL: string;
  imageSource: string;
  imageAlt: string;
};

export function TechnologyEntry({
  technologyWebsiteURL,
  imageSource,
  imageAlt,
}: Props) {
  return (
    <li className="landing-technology-entry">
      <a
        href={technologyWebsiteURL}
        className="landing-technology-entry__link"
        target="_blank">
        <img
          className="landing-technology-entry__logo"
          src={imageSource}
          alt={imageAlt}
        />
      </a>
    </li>
  );
}
