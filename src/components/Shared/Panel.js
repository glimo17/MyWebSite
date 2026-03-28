import styles from './Panel.module.css';

function Panel({ children, className = '', ...props }) {
  const panelClassName = `${styles.panel} ${className}`.trim();

  return (
    <section className={panelClassName} {...props}>
      {children}
    </section>
  );
}

export default Panel;