import { useState } from 'react';
import Panel from '../Shared/Panel';
import styles from './ExperienceSection.module.css';

function ExperienceItem({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const description =
    item.summary ||
    'Experience description placeholder. Replace this text with role details when content is ready.';

  return (
    <article className={`${styles.itemCard} ${isExpanded ? styles.itemCardExpanded : ''}`.trim()}>
      <h3 className={styles.itemTitle}>{item.role}</h3>

      <div className={styles.descriptionRow}>
        <p className={`${styles.description} ${isExpanded ? styles.descriptionExpanded : ''}`.trim()}>
          {description}
        </p>
        <button
          type="button"
          className={styles.toggleLink}
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
        >
          {isExpanded ? '...see less' : '...see more'}
        </button>
      </div>
    </article>
  );
}

function ExperienceSection({ items }) {
  return (
    <Panel className={styles.sectionPanel}>
      <div className={styles.sectionHeader}>
        <h2>Experience</h2>
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