import { NavLink } from 'react-router-dom';
import Panel from '../Shared/Panel';
import styles from './SidebarNav.module.css';

const navItems = [
  { label: 'Profile', path: '/profile' },
  { label: 'Portfolio', path: '/portfolio' },
];

function SidebarNav() {
  return (
    <Panel className={styles.sidebarPanel}>
      <div className={styles.brandBlock}>
        <span className={styles.brandDot} aria-hidden="true" />
        <h2>Portfolio Shell</h2>
      </div>

      <nav className={styles.nav} aria-label="Primary sidebar navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`.trim()
            }
          >
            <span className={styles.navIcon} aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </Panel>
  );
}

export default SidebarNav;