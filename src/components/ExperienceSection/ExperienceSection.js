import { useState } from 'react';
import { useLang } from '../../app/LangContext';
import Panel from '../Shared/Panel';
import styles from './ExperienceSection.module.css';

function ExperienceItem({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLang();
  const description =
    item.summary ||
    'Experience description placeholder. Replace this text with role details when content is ready.';
  const highlights = Array.isArray(item.highlights) ? item.highlights : [];

  return (
    <article className={`${styles.itemCard} ${isExpanded ? styles.itemCardExpanded : ''}`.trim()}>
      <div className={styles.itemTopRow}>
        <h3 className={styles.itemTitle}>{item.role}</h3>
        <span className={styles.itemPeriod}>{item.period}</span>
      </div>
      <p className={styles.itemCompany}>{item.company}</p>

      <div className={styles.descriptionRow}>
        <p className={`${styles.description} ${isExpanded ? styles.descriptionExpanded : ''}`.trim()}>
          {description}
        </p>
        <button
          type="button"
          className={styles.toggleLink}
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
        >
          {isExpanded ? t.experience.seeLess : t.experience.seeMore}
        </button>
      </div>

      {isExpanded && highlights.length > 0 ? (
        <ul className={styles.highlightsList}>
          {highlights.map((highlight) => (
            <li key={highlight} className={styles.highlightRow}>
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function ExperienceSection({ items }) {
  const { t } = useLang();
  return (
    <Panel className={styles.sectionPanel}>
      <div className={styles.sectionHeader}>
        <h2>{t.experience.title}</h2>
      </div>

      <div className={styles.sectionContent}>
        {items.map((item) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
      </div>
    </Panel>
  );
}

export default ExperienceSection;