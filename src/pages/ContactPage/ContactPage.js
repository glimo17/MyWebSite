import { useAppContext } from '../../app/AppContext';
import { useLang } from '../../app/LangContext';
import Panel from '../../components/Shared/Panel';
import styles from './ContactPage.module.css';

function ContactPage() {
  const { portfolio } = useAppContext();
  const { t } = useLang();
  const { contact, profile } = portfolio;

  return (
    <div className={styles.page}>
      <Panel className={styles.heroPanel}>
        <div className={styles.heroInner}>
          <div className={styles.avatar}>
            {profile.name
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((s) => s[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.headline}>{profile.headline}</p>
            <p className={styles.location}>
              <span className={styles.locationIcon} aria-hidden="true">📍</span>
              {profile.location}
            </p>
          </div>
        </div>
      </Panel>

      <div className={styles.cards}>
        <Panel className={styles.card}>
          <h2 className={styles.cardTitle}>{t.contact.emailLabel}</h2>
          <a className={styles.link} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </Panel>

        <Panel className={styles.card}>
          <h2 className={styles.cardTitle}>{t.contact.phoneLabel}</h2>
          {contact.phones.map((phone) => (
            <a key={phone} className={styles.link} href={`tel:${phone.replace(/\s/g, '')}`}>
              {phone}
            </a>
          ))}
        </Panel>

        <Panel className={styles.card}>
          <h2 className={styles.cardTitle}>{t.contact.githubLabel}</h2>
          <a
            className={styles.link}
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.githubLabel}
          </a>
        </Panel>
      </div>

      <Panel className={styles.formPanel}>
        <h2 className={styles.formTitle}>{t.contact.formTitle}</h2>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
              data.get('subject')
            )}&body=${encodeURIComponent(data.get('message'))}`;
          }}
        >
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-name">{t.contact.nameLabel}</label>
              <input
                id="contact-name"
                className={styles.input}
                name="name"
                type="text"
                placeholder={t.contact.namePlaceholder}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-email">{t.contact.emailFieldLabel}</label>
              <input
                id="contact-email"
                className={styles.input}
                name="email"
                type="email"
                placeholder={t.contact.emailPlaceholder}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-subject">{t.contact.subjectLabel}</label>
            <input
              id="contact-subject"
              className={styles.input}
              name="subject"
              type="text"
              placeholder={t.contact.subjectPlaceholder}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-message">{t.contact.messageLabel}</label>
            <textarea
              id="contact-message"
              className={styles.textarea}
              name="message"
              rows={5}
              placeholder={t.contact.messagePlaceholder}
              required
            />
          </div>

          <button className={styles.submitBtn} type="submit">
            {t.contact.submit}
          </button>
        </form>
      </Panel>
    </div>
  );
}

export default ContactPage;
