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
  const { filteredFeedItems } = useAppContext();

  return (
    <div className={styles.feed}>
      <FeedComposer />

      {filteredFeedItems.length === 0 ? (
        <Panel>
          <div className={styles.emptyState}>
            <h3>No placeholder posts match the current search.</h3>
            <p>Try a different query or remove the filter to view all editable feed cards.</p>
            <SkeletonCard />
          </div>
        </Panel>
      ) : (
        filteredFeedItems.map((item) => (
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