import Feed from '../../components/Feed/Feed';
import LeftNavMenu from '../../components/LeftNavMenu/LeftNavMenu';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import Widgets from '../../components/Widgets/Widgets';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.layout}>
      <aside className={styles.leftColumn}>
        <div className={styles.leftStack}>
          <ProfileSummary />
          <LeftNavMenu />
        </div>
      </aside>

      <section className={styles.centerColumn}>
        <Feed />
      </section>

      <aside className={styles.rightColumn}>
        <Widgets />
      </aside>
    </div>
  );
}

export default HomePage;