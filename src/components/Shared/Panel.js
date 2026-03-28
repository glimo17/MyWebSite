import styles from './Panel.module.css';

function Panel({ children, className = '' }) {
  const panelClassName = `${styles.panel} ${className}`.trim();

  return <section className={panelClassName}>{children}</section>;
}

export default Panel;