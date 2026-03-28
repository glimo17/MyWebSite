import { useAppContext } from '../../app/AppContext';
import Panel from '../../components/Shared/Panel';
import styles from './ProfilePage.module.css';

function SectionList({ title, items, renderItem }) {
  return (
    <Panel className={styles.sectionPanel}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <button type="button">Edit later</button>
      </div>
      <div className={styles.sectionContent}>{items.map(renderItem)}</div>
    </Panel>
  );
}

function ProfilePage() {
  const { portfolio } = useAppContext();
  const { experience, profile, projects, skills } = portfolio;

  return (
    <div className={styles.page}>
      <Panel className={styles.heroPanel}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroContent}>
          <div className={styles.heroAvatar} aria-hidden="true">
            {profile.name
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((segment) => segment[0])
              .join('')}
          </div>

          <div className={styles.heroText}>
            <h1>{profile.name}</h1>
            <p>{profile.headline}</p>
            <span>{profile.location}</span>
          </div>
        </div>
      </Panel>

      <Panel className={styles.aboutPanel}>
        <div className={styles.sectionHeader}>
          <h2>About</h2>
          <button type="button">Edit later</button>
        </div>
        <p>{profile.about}</p>
      </Panel>

      <SectionList
        title="Experience"
        items={experience}
        renderItem={(item) => (
          <article key={item.id} className={styles.timelineItem}>
            <div className={styles.timelineMarker} aria-hidden="true" />
            <div>
              <h3>{item.role}</h3>
              <span>{item.period}</span>
              <p>{item.summary}</p>
            </div>
          </article>
        )}
      />

      <SectionList
        title="Projects"
        items={projects}
        renderItem={(item) => (
          <article key={item.id} className={styles.cardItem}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <span>{item.status}</span>
          </article>
        )}
      />

      <Panel className={styles.sectionPanel}>
        <div className={styles.sectionHeader}>
          <h2>Skills</h2>
          <button type="button">Edit later</button>
        </div>
        <div className={styles.skillGrid}>
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default ProfilePage;