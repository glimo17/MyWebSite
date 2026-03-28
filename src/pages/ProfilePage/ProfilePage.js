import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { certifications, contact, education, experience, profile, projects, skillGroups } =
    portfolio;

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const sectionId = location.hash.replace('#', '');
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  return (
    <div className={styles.page}>
      <Panel className={styles.heroPanel}>
        <div className={styles.heroBackdrop} />
        <div id="profile" className={styles.heroContent}>
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
            <div className={styles.heroLinks}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub portfolio
              </a>
            </div>
          </div>
        </div>
      </Panel>

      <Panel className={styles.aboutPanel}>
        <div className={styles.sectionHeader}>
          <h2>Professional Summary</h2>
          <button type="button">Edit later</button>
        </div>
        <p>{profile.summary}</p>
      </Panel>

      <SectionList
        title="Experience"
        items={experience}
        renderItem={(item) => (
          <article key={item.id} className={styles.timelineItem}>
            <div className={styles.timelineMarker} aria-hidden="true" />
            <div>
              <h3>{item.role}</h3>
              <span>{item.company} | {item.period}</span>
              <p>{item.summary}</p>
              <ul className={styles.bulletList}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        )}
      />

      <SectionList
        title="Portfolio"
        items={projects}
        renderItem={(item) => (
          <article id={item.id === 'portfolio-main' ? 'portfolio' : undefined} key={item.id} className={styles.cardItem}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <ul className={styles.bulletList}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
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
        <div className={styles.skillGroupList}>
          {skillGroups.map((group) => (
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

      <SectionList
        title="Education"
        items={education}
        renderItem={(item) => (
          <article key={item.id} className={styles.cardItem}>
            <div>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
            </div>
            <span>{item.period}</span>
          </article>
        )}
      />

      <SectionList
        title="Certifications"
        items={certifications}
        renderItem={(item) => (
          <article key={item.id} className={styles.cardItem}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.issuer}</p>
            </div>
            <span>{item.type}</span>
          </article>
        )}
      />

      <Panel id="contact" className={styles.sectionPanel}>
        <div className={styles.sectionHeader}>
          <h2>Contact</h2>
          <button type="button">Edit later</button>
        </div>
        <div className={styles.contactGrid}>
          {contact.phones.map((phone) => (
            <a key={phone} className={styles.contactCard} href={`tel:${phone.replace(/\s+/g, '')}`}>
              <strong>Phone</strong>
              <span>{phone}</span>
            </a>
          ))}
          <a className={styles.contactCard} href={`mailto:${contact.email}`}>
            <strong>Email</strong>
            <span>{contact.email}</span>
          </a>
          <a className={styles.contactCard} href={contact.github} target="_blank" rel="noreferrer">
            <strong>Portfolio & Code Samples</strong>
            <span>{contact.githubLabel}</span>
          </a>
        </div>
      </Panel>
    </div>
  );
}

export default ProfilePage;