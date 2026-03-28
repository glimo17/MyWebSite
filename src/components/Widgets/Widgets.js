import { useAppContext } from '../../app/AppContext';
import Panel from '../Shared/Panel';
import styles from './Widgets.module.css';

function Widgets() {
  const { portfolio } = useAppContext();

  return (
    <div className={styles.widgets}>
      {portfolio.widgets.map((widget) => (
        <Panel key={widget.id} className={styles.widgetCard}>
          <div className={styles.widgetHeader}>
            <h3>{widget.title}</h3>
            <span aria-hidden="true" className={styles.widgetBadge} />
          </div>
          <p>{widget.description}</p>
          <button type="button">Reserve this section</button>
        </Panel>
      ))}
    </div>
  );
}

export default Widgets;