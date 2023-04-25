import './MediaEntry.css';

type Props = {
  linkName: string;
  linkURL: string;
  linkIcon?: string;
};

export function MediaEntry({ linkName, linkURL, linkIcon }: Props) {
  return (
    <li className="landing-media-entry">
      <a className="landing-media-entry__link" href={linkURL} target="_blank">
        <h3 className={linkIcon ?? ''}>{linkName}</h3>
      </a>
    </li>
  );
}
