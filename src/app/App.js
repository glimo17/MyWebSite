import { Navigate, Route, Routes } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav/SidebarNav';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PortfolioPage from '../pages/PortfolioPage/PortfolioPage';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebarArea}>
        <div className={styles.sidebarSticky}>
          <SidebarNav />
        </div>
      </aside>

      <main className={styles.pageArea}>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;