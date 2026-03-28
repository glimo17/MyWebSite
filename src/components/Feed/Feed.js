import { useAppContext } from '../../app/AppContext';
import Panel from '../Shared/Panel';
import SkeletonCard from '../Shared/SkeletonCard';
import styles from './Feed.module.css';

function FeedComposer() {
  return (
    <Panel className={styles.composer}>
      <div className={styles.composerRow}>
        <div className={styles.composerAvatar} aria-hidden="true" />
        <button type="button" className={styles.composerButton}>
          Start a placeholder post
        </button>
      </div>
      <div className={styles.composerActions}>
        <button type="button">Media</button>
        <button type="button">Event</button>
        <button type="button">Article</button>
      </div>
    </Panel>
  );
}

function Feed() {
  const { portfolio } = useAppContext();
  const feedItems = portfolio.feedItems || [];

  return (
    <div className={styles.feed}>
      <FeedComposer />

      {feedItems.length === 0 ? (
        <Panel>
          <div className={styles.emptyState}>
            <h3>No placeholder posts yet.</h3>
            <p>Add feed items to the data file to populate this editable feed area.</p>
            <SkeletonCard />
          </div>
        </Panel>
      ) : (
        feedItems.map((item) => (
          <Panel key={item.id} className={styles.postCard}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar} aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </div>
            </div>

            <p className={styles.postBody}>{item.body}</p>
            <div className={styles.postTag}>{item.tag}</div>

            <div className={styles.postFooter}>
              <button type="button">Like</button>
              <button type="button">Comment</button>
              <button type="button">Share</button>
              <button type="button">Send</button>
            </div>
          </Panel>
        ))
      )}
    </div>
  );
}

export default Feed;