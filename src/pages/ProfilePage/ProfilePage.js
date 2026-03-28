import ExperienceSection from '../../components/ExperienceSection/ExperienceSection';
import Panel from '../../components/Shared/Panel';
import styles from './ProfilePage.module.css';

const placeholderExperience = [
  {
    id: 'exp-placeholder-1',
    role: 'Experience title placeholder',
    summary:
      'Short experience summary placeholder. Replace with role responsibilities and key outcomes later.',
  },
  {
    id: 'exp-placeholder-2',
    role: 'Second experience title placeholder',
    summary:
      'Another short placeholder summary for a different role in your profile timeline.',
  },
  {
    id: 'exp-placeholder-3',
    role: 'Third experience title placeholder',
    summary:
      'Placeholder description text for additional experience entries in your profile section.',
  },
];

const placeholderSkillGroups = [
  {
    category: 'Core Skills',
    items: ['Skill placeholder', 'Another skill', 'Tooling placeholder', 'Workflow placeholder'],
  },
  {
    category: 'Technology Focus',
    items: ['Frontend placeholder', 'Backend placeholder', 'Database placeholder', 'Cloud placeholder'],
  },
];

function ProfilePage() {
  return (
    <div className={styles.page}>
      <Panel className={styles.heroPanel}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroContent}>
          <div className={styles.heroAvatar} aria-hidden="true">PR</div>

          <div className={styles.heroText}>
            <h1>Profile</h1>
            <p>Professional headline placeholder</p>
            <span>Location placeholder</span>
          </div>
        </div>
      </Panel>

      <Panel className={styles.aboutPanel}>
        <div className={styles.sectionHeader}>
          <h2>About</h2>
        </div>
        <p>
          About section placeholder. Replace this with a short professional summary tailored to your
          background and goals.
        </p>
      </Panel>

      <ExperienceSection items={placeholderExperience} />

      <Panel className={styles.sectionPanel}>
        <div className={styles.sectionHeader}>
          <h2>Skills</h2>
        </div>
        <div className={styles.skillGroupList}>
          {placeholderSkillGroups.map((group) => (
            <article key={group.category} className={styles.skillGroupCard}>
              <h3>{group.category}</h3>
              <div className={styles.skillGrid}>
                {group.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default ProfilePage;