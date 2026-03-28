import styles from './SkeletonCard.module.css';

function SkeletonCard() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.avatar} />
      <div className={styles.lines}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default SkeletonCard;