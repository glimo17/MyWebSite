import { useState } from 'react';
import ExperienceSection from '../../components/ExperienceSection/ExperienceSection';
import { useAppContext } from '../../app/AppContext';
import { useLang } from '../../app/LangContext';
import { useAuth } from '../../app/AuthContext';
import Panel from '../../components/Shared/Panel';
import ResumePDF from '../../components/ResumePDF/ResumePDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import profilePhoto from '../../images/312330505_9701483749877262_4888676087625471162_n.jpg';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const { portfolio, updatePortfolio } = useAppContext();
  const { t, lang } = useLang();
  const { isAuthenticated } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const activeData = isEditing ? draft : portfolio;
  const { experience, profile } = activeData;

  function startEditing() {
    setDraft(JSON.parse(JSON.stringify(portfolio)));
    setIsEditing(true);
  }

  function handleSave() {
    updatePortfolio(lang, draft);
    setIsEditing(false);
    setDraft(null);
  }

  function handleCancel() {
    setIsEditing(false);
    setDraft(null);
  }

  function handleProfileField(field, value) {
    setDraft(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  }

  function handleExperienceChange(updatedItems) {
    setDraft(prev => ({ ...prev, experience: updatedItems }));
  }

  return (
    <div className={styles.page}>
      {isEditing && (
        <div className={styles.editBanner}>
          <span className={styles.editBannerLabel}>✏️ Edit Mode active</span>
          <div className={styles.editBannerActions}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className={styles.saveBtn} onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      <Panel className={`${styles.heroPanel} ${isEditing ? styles.panelEditing : ''}`}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroContent}>
          <img className={styles.heroAvatar} src={profilePhoto} alt={profile.name} />

          <div className={styles.heroText}>
            {isEditing ? (
              <>
                <input
                  className={styles.editInput}
                  value={draft.profile.name}
                  onChange={e => handleProfileField('name', e.target.value)}
                  placeholder="Full Name"
                />
                <input
                  className={`${styles.editInput} ${styles.editInputSub}`}
                  value={draft.profile.headline}
                  onChange={e => handleProfileField('headline', e.target.value)}
                  placeholder="Headline"
                />
                <input
                  className={`${styles.editInput} ${styles.editInputSub}`}
                  value={draft.profile.location}
                  onChange={e => handleProfileField('location', e.target.value)}
                  placeholder="Location"
                />
              </>
            ) : (
              <>
                <h1>{profile.name}</h1>
                <p>{profile.headline}</p>
                <span>{profile.location}</span>
              </>
            )}

            <div className={styles.heroActions}>
              {!isEditing && (
                <PDFDownloadLink
                  document={<ResumePDF portfolio={portfolio} labels={t.pdf} />}
                  fileName={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                  className={styles.downloadBtn}
                >
                  {({ loading }) =>
                    loading ? t.pdf.generating : `⬇️ ${t.pdf.downloadBtn}`
                  }
                </PDFDownloadLink>
              )}
              {isAuthenticated && !isEditing && (
                <button type="button" className={styles.editProfileBtn} onClick={startEditing}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </Panel>

      <Panel className={`${styles.aboutPanel} ${isEditing ? styles.panelEditing : ''}`}>
        <div className={styles.sectionHeader}>
          <h2>{t.profile.about}</h2>
        </div>
        {isEditing ? (
          <textarea
            className={styles.editTextarea}
            value={draft.profile.summary}
            onChange={e => handleProfileField('summary', e.target.value)}
            rows={6}
            placeholder="Professional summary"
          />
        ) : (
          <p>{profile.summary}</p>
        )}
      </Panel>

      <ExperienceSection
        items={experience}
        isEditing={isEditing}
        onItemsChange={handleExperienceChange}
      />
    </div>
  );
}

export default ProfilePage;