import { useState } from 'react';
import { useLang } from '../../app/LangContext';
import Panel from '../Shared/Panel';
import styles from './ExperienceSection.module.css';

/* ── READ-ONLY ITEM ── */
function ExperienceItem({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLang();
  const description = item.summary || 'Experience description placeholder.';
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
          onClick={() => setIsExpanded(v => !v)}
        >
          {isExpanded ? t.experience.seeLess : t.experience.seeMore}
        </button>
      </div>

      {isExpanded && highlights.length > 0 ? (
        <ul className={styles.highlightsList}>
          {highlights.map((h, i) => (
            <li key={i} className={styles.highlightRow}>{h}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

/* ── EDITABLE ITEM ── */
function ExperienceItemEdit({ item, onChange }) {
  function field(key, value) {
    onChange({ ...item, [key]: value });
  }

  function updateHighlight(index, value) {
    const next = [...(item.highlights || [])];
    next[index] = value;
    onChange({ ...item, highlights: next });
  }

  function removeHighlight(index) {
    onChange({ ...item, highlights: item.highlights.filter((_, i) => i !== index) });
  }

  function addHighlight() {
    onChange({ ...item, highlights: [...(item.highlights || []), ''] });
  }

  return (
    <article className={`${styles.itemCard} ${styles.itemCardEditing}`}>
      <div className={styles.editTopRow}>
        <input
          className={styles.editInput}
          value={item.role}
          onChange={e => field('role', e.target.value)}
          placeholder="Role / Title"
        />
        <input
          className={`${styles.editInput} ${styles.editInputPeriod}`}
          value={item.period}
          onChange={e => field('period', e.target.value)}
          placeholder="Period"
        />
      </div>
      <input
        className={`${styles.editInput} ${styles.editInputCompany}`}
        value={item.company}
        onChange={e => field('company', e.target.value)}
        placeholder="Company"
      />
      <textarea
        className={styles.editTextarea}
        value={item.summary || ''}
        onChange={e => field('summary', e.target.value)}
        rows={3}
        placeholder="Summary"
      />

      <div className={styles.highlightsEdit}>
        <p className={styles.highlightsEditLabel}>Highlights</p>
        {(item.highlights || []).map((h, i) => (
          <div key={i} className={styles.highlightEditRow}>
            <textarea
              className={`${styles.editTextarea} ${styles.editTextareaSmall}`}
              value={h}
              onChange={e => updateHighlight(i, e.target.value)}
              rows={2}
            />
            <button
              type="button"
              className={styles.removeHighlightBtn}
              onClick={() => removeHighlight(i)}
              aria-label="Remove highlight"
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className={styles.addHighlightBtn} onClick={addHighlight}>
          + Add Highlight
        </button>
      </div>
    </article>
  );
}

/* ── SECTION ── */
function ExperienceSection({ items, isEditing = false, onItemsChange }) {
  const { t } = useLang();

  function handleItemChange(index, updated) {
    const next = items.map((item, i) => (i === index ? updated : item));
    onItemsChange?.(next);
  }

  return (
    <Panel className={`${styles.sectionPanel} ${isEditing ? styles.sectionPanelEditing : ''}`}>
      <div className={styles.sectionHeader}>
        <h2>{t.experience.title}</h2>
      </div>

      <div className={styles.sectionContent}>
        {items.map((item, index) =>
          isEditing ? (
            <ExperienceItemEdit
              key={item.id}
              item={item}
              onChange={updated => handleItemChange(index, updated)}
            />
          ) : (
            <ExperienceItem key={item.id} item={item} />
          )
        )}
      </div>
    </Panel>
  );
}

export default ExperienceSection;