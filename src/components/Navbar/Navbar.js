import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../app/AppContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { searchQuery, setSearchQuery } = useAppContext();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandArea}>
          <NavLink to="/" className={styles.logoLink} aria-label="Go to home">
            <span className={styles.logoMark}>in</span>
          </NavLink>
          <label className={styles.searchField}>
            <span className={styles.searchIcon} aria-hidden="true">
              Search
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search placeholder content"
            />
          </label>
        </div>
      </div>
    </header>
  );
}

export default Navbar;