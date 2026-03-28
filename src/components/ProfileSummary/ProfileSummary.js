import { Link } from 'react-router-dom';
import { useAppContext } from '../../app/AppContext';
import Panel from '../Shared/Panel';
import styles from './ProfileSummary.module.css';

function ProfileSummary() {
  const { portfolio } = useAppContext();
  const { contact, profile } = portfolio;

  return (
    <Panel className={styles.panel}>
      <div className={styles.cover} />
      <div className={styles.content}>
        <div className={styles.avatar} aria-hidden="true">
          {profile.name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((segment) => segment[0])
            .join('')}
        </div>

        <div className={styles.identity}>
          <h2>{profile.name}</h2>
          <p>{profile.headline}</p>
          <span>{profile.location}</span>
        </div>

        <div className={styles.contactPreview}>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.github} target="_blank" rel="noreferrer">
            View code samples
          </a>
        </div>

        <div className={styles.stats}>
          {profile.stats.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className={styles.highlights}>
          {profile.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <Link to="/profile" className={styles.cta}>
          View full portfolio
        </Link>
      </div>
    </Panel>
  );
}

export default ProfileSummary;