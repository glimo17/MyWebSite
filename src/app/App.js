import { Navigate, Route, Routes } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav/SidebarNav';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PortfolioPage from '../pages/PortfolioPage/PortfolioPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import SkillsPage from '../pages/SkillsPage/SkillsPage';
import styles from './App.module.css';

function App() {
  return (
    <>
      <header className={styles.topBar}>
        <SidebarNav />
      </header>

      <div className={styles.appShell}>
        <main className={styles.pageArea}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;