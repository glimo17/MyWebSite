import ExperienceSection from '../../components/ExperienceSection/ExperienceSection';
import { useAppContext } from '../../app/AppContext';
import { useLang } from '../../app/LangContext';
import Panel from '../../components/Shared/Panel';
import ResumePDF from '../../components/ResumePDF/ResumePDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import profilePhoto from '../../images/312330505_9701483749877262_4888676087625471162_n.jpg';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const { portfolio } = useAppContext();
  const { t } = useLang();
  const { experience, profile } = portfolio;

  return (
    <div className={styles.page}>
      <Panel className={styles.heroPanel}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroContent}>
          <img className={styles.heroAvatar} src={profilePhoto} alt={profile.name} />

          <div className={styles.heroText}>
            <h1>{profile.name}</h1>
            <p>{profile.headline}</p>
            <span>{profile.location}</span>
            <div className={styles.heroActions}>
              <PDFDownloadLink
                document={<ResumePDF portfolio={portfolio} labels={t.pdf} />}
                fileName={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                className={styles.downloadBtn}
              >
                {({ loading }) =>
                  loading ? t.pdf.generating : `⬇️ ${t.pdf.downloadBtn}`
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </Panel>

      <Panel className={styles.aboutPanel}>
        <div className={styles.sectionHeader}>
          <h2>{t.profile.about}</h2>
        </div>
        <p>{profile.summary}</p>
      </Panel>

      <ExperienceSection items={experience} />
    </div>
  );
}

export default ProfilePage;