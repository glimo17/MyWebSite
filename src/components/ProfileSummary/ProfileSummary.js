import { Link } from 'react-router-dom';
import { useAppContext } from '../../app/AppContext';
import Panel from '../Shared/Panel';
import styles from './ProfileSummary.module.css';

function ProfileSummary() {
  const { portfolio } = useAppContext();
  const { profile } = portfolio;

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

        <div className={styles.stats}>
          <div>
            <span>Profile views</span>
            <strong>{profile.stats.profileViews}</strong>
          </div>
          <div>
            <span>Post impressions</span>
            <strong>{profile.stats.postImpressions}</strong>
          </div>
          <div>
            <span>Connections</span>
            <strong>{profile.stats.connections}</strong>
          </div>
        </div>

        <div className={styles.highlights}>
          {profile.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <Link to="/profile" className={styles.cta}>
          View full profile shell
        </Link>
      </div>
    </Panel>
  );
}

export default ProfileSummary;