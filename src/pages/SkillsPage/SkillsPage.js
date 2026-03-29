import { useAppContext } from '../../app/AppContext';
import { useLang } from '../../app/LangContext';
import Panel from '../../components/Shared/Panel';
import styles from './SkillsPage.module.css';

const categoryIcons = {
  'Languages & Frameworks': '⚙️',
  'AI & GenAI': '🤖',
  'Databases': '🗄️',
  'Data Engineering': '📊',
  'Power Platform': '💡',
  'Cloud & DevOps': '☁️',
  'Methodologies': '📋',
};

function SkillsPage() {
  const { portfolio } = useAppContext();
  const { t } = useLang();
  const { skillGroups } = portfolio;

  return (
    <div className={styles.page}>
      <Panel className={styles.headerPanel}>
        <h1 className={styles.pageTitle}>{t.skills.title}</h1>
        <p className={styles.pageSubtitle}>{t.skills.subtitle}</p>
      </Panel>

      <div className={styles.grid}>
        {skillGroups.map((group) => (
          <Panel key={group.category} className={styles.groupCard}>
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon} aria-hidden="true">
                {categoryIcons[group.category] ?? '🔧'}
              </span>
              <h2 className={styles.groupTitle}>{group.category}</h2>
            </div>
            <div className={styles.tagList}>
              {group.items.map((item) => (
                <span key={item} className={styles.tag}>{item}</span>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;
