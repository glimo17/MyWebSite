import Panel from '../../components/Shared/Panel';
import styles from './PortfolioPage.module.css';

const placeholderProjects = [
  {
    id: 'placeholder-1',
    title: 'Project title placeholder',
    description: 'Short project summary placeholder. Add business context, stack, and outcomes here.',
    status: 'Draft',
  },
  {
    id: 'placeholder-2',
    title: 'Second project placeholder',
    description: 'Another project card placeholder for future portfolio entries.',
    status: 'Planned',
  },
  {
    id: 'placeholder-3',
    title: 'Case study placeholder',
    description: 'Reserve this card for architecture notes, screenshots, or deployment details.',
    status: 'Upcoming',
  },
];

function PortfolioPage() {
  return (
    <div className={styles.page}>
      <Panel className={styles.sectionPanel}>
        <div className={styles.sectionHeader}>
          <h1>Portfolio</h1>
          <p>Project cards placeholder section.</p>
        </div>

        <div className={styles.projectGrid}>
          {placeholderProjects.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <span>{project.status}</span>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default PortfolioPage;