import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import HomePage from '../pages/HomePage/HomePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appShell}>
      <Navbar />
      <main className={styles.pageArea}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;