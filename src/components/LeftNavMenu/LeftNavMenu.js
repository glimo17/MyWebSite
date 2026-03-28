import { Link } from 'react-router-dom';
import Panel from '../Shared/Panel';
import styles from './LeftNavMenu.module.css';

const menuItems = [
  {
    label: 'Profile',
    description: 'Summary, experience, skills, and background',
    to: '/profile#profile',
  },
  {
    label: 'Portafolio',
    description: 'Featured work, engineering focus, and code samples',
    to: '/profile#portfolio',
  },
  {
    label: 'Contact',
    description: 'Phone, email, and portfolio links',
    to: '/profile#contact',
  },
];

function LeftNavMenu() {
  return (
    <Panel className={styles.panel}>
      <div className={styles.header}>
        <h3>Navigate</h3>
        <p>Quick access to the main portfolio sections.</p>
      </div>

      <nav className={styles.nav} aria-label="Profile section navigation">
        {menuItems.map((item) => (
          <Link key={item.label} to={item.to} className={styles.navItem}>
            <span className={styles.navTitle}>{item.label}</span>
            <span className={styles.navDescription}>{item.description}</span>
          </Link>
        ))}
      </nav>
    </Panel>
  );
}

export default LeftNavMenu;