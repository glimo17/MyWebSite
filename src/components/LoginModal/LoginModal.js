import { useEffect, useState } from 'react';
import { useLang } from '../../app/LangContext';
import { useAuth } from '../../app/AuthContext';
import styles from './LoginModal.module.css';

function LoginModal({ isOpen, onClose }) {
  const { t } = useLang();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setUsername('');
      setPassword('');
      setErrorMessage('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const result = await login({ username, password });

      if (!result.ok) {
        setErrorMessage(
          result.reason === 'missing-config' ? t.auth.missingConfig : t.auth.invalidCredentials
        );
        setIsSubmitting(false);
        return;
      }

      onClose();
    } catch {
      setErrorMessage(t.auth.genericError);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{t.auth.eyebrow}</p>
            <h2 id="login-modal-title" className={styles.title}>{t.auth.loginTitle}</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            {t.auth.close}
          </button>
        </div>

        <p className={styles.subtitle}>{t.auth.subtitle}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>{t.auth.usernameLabel}</span>
            <input
              className={styles.input}
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>{t.auth.passwordLabel}</span>
            <input
              className={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

          <div className={styles.actions}>
            <button type="button" className={styles.secondaryButton} onClick={onClose}>
              {t.auth.cancel}
            </button>
            <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
              {isSubmitting ? t.auth.loggingIn : t.auth.loginAction}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
