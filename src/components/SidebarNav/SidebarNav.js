import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { useLang } from '../../app/LangContext';
import LoginModal from '../LoginModal/LoginModal';
import styles from './SidebarNav.module.css';

const navPaths = [
  { key: 'profile', path: '/profile' },
  { key: 'portfolio', path: '/portfolio' },
  { key: 'skills', path: '/skills' },
  { key: 'contact', path: '/contact' },
];

function SidebarNav() {
  const { lang, setLang, t } = useLang();
  const { isAuthenticated, logout, user } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <div className={styles.navWrapper}>
        <div className={styles.brand}>
          <span className={styles.brandAvatar} aria-hidden="true">JC</span>

          {isAuthenticated ? (
            <div className={styles.authArea}>
              <span className={styles.userChip}>{user?.username}</span>
              <button type="button" className={styles.logoutButton} onClick={logout}>
                {t.auth.logout}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.loginTrigger}
              onClick={() => setIsLoginOpen(true)}
            >
              {t.auth.login}
            </button>
          )}
        </div>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navPaths.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`.trim()
              }
            >
              {t.nav[item.key]}
            </NavLink>
          ))}
        </nav>

        <div className={styles.rightControls}>
          <div className={styles.langSwitch} role="group" aria-label="Language">
            <button
              type="button"
              className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              English
            </button>
            <button
              type="button"
              className={`${styles.langBtn} ${styles.langBtnEs} ${lang === 'es' ? styles.langBtnActive : ''}`}
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
            >
              Español
            </button>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default SidebarNav;