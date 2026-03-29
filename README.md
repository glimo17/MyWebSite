# Jean Carlos Murillo Vásquez — Portfolio

A personal portfolio web application built with **React 18**, featuring bilingual support (English / Spanish), a downloadable PDF resume, a demo login system, and an authenticated edit mode for updating profile content directly in the browser.

---

## Live Features

| Feature | Description |
|---|---|
| **Profile Page** | Hero section with photo, name, headline, location, and PDF download |
| **About Section** | Professional summary |
| **Experience Section** | Expandable job cards with role, company, period, summary, and highlights |
| **Skills & Technology** | Categorised skill groups with icons |
| **Portfolio** | Project showcase cards |
| **Contact** | Contact details and links |
| **Bilingual (EN / ES)** | Full English / Spanish toggle — UI labels and portfolio data |
| **PDF Resume** | One-click download of a formatted A4 resume via `@react-pdf/renderer` |
| **Login** | Demo authentication modal (SHA-256, no plain-text credentials) |
| **Edit Mode** | Authenticated users can edit profile, about, and all experience entries inline |

---

## Tech Stack

- **React 18** — functional components, hooks, Context API
- **react-router-dom v6** — client-side routing
- **CSS Modules** — scoped component styles
- **@react-pdf/renderer v4** — PDF generation in the browser
- **Web Crypto API** — built-in SHA-256 password hashing (no external crypto library)

---

## Project Structure

```
src/
├── app/
│   ├── App.js              # Route definitions
│   ├── AppContext.js        # Portfolio data (bilingual, with localStorage edits)
│   ├── AuthContext.js       # Demo authentication (SHA-256, localStorage session)
│   └── LangContext.js       # Language state + translation strings
│
├── components/
│   ├── ExperienceSection/   # Expandable job cards + inline edit mode
│   ├── LoginModal/          # Auth modal dialog
│   ├── ResumePDF/           # @react-pdf/renderer resume document
│   ├── Shared/              # Panel, shared layout components
│   └── SidebarNav/          # Top navigation, language switcher, auth controls
│
├── data/
│   ├── portfolioData.json      # English portfolio data
│   └── portfolioData.es.json   # Spanish portfolio data
│
├── i18n/
│   ├── en.js               # English UI translations
│   └── es.js               # Spanish UI translations
│
├── images/                  # Profile photo
├── pages/
│   ├── ContactPage/
│   ├── PortfolioPage/
│   ├── ProfilePage/         # Main profile + edit mode
│   └── SkillsPage/
│
├── styles/
│   └── index.css            # Global CSS variables and base styles
│
└── utils/
    └── auth.js              # sha256Hex(), comparePasswordToHash()
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Configure credentials

Create a `.env` file in the project root (never commit this file):

```env
REACT_APP_AUTH_USERNAME=your_username
REACT_APP_AUTH_PASSWORD_HASH=your_sha256_hash
```

Generate the SHA-256 hash of your password in a terminal:

```bash
node -e "const c=require('crypto');console.log(c.createHash('sha256').update('your_password').digest('hex'));"
```

A `.env.example` file is included as a reference template.

### Start development server

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000). The server must be **restarted** after any `.env` changes.

### Production build

```bash
npm run build
```

Output is in the `build/` folder — ready to deploy to Vercel, Netlify, or any static host.

---

## Edit Mode (Authenticated)

1. Click **Login** in the navigation bar and enter your credentials.
2. Navigate to the **Profile** page.
3. Click the **✏️ Edit Profile** button that appears in the hero section.
4. An amber **Edit Mode** banner confirms editing is active.
5. Edit any field:
   - Hero: name, headline, location
   - About: professional summary
   - Experience: role, company, period, summary, and individual highlights (add / remove)
6. Click **Save Changes** — data is saved to `localStorage` and persists across page refreshes.
7. Click **Cancel** to discard changes.

> Edit mode is only visible when you are logged in. All changes are stored locally in the browser.

---

## Bilingual Support

Click **English** or **Español** in the navigation bar to switch languages. Both the UI labels and portfolio content (experience titles, summaries, skill categories, etc.) switch simultaneously.

---

## Security Notes

- Credentials are **never hard-coded** — they come from environment variables.
- Passwords are stored and compared as **SHA-256 hashes only**.
- The `.env` file is listed in `.gitignore` and should never be committed.
- This is a **frontend demo** authentication system — not suitable for production APIs or sensitive data without a backend.

---

## Deployment Notes

- Set `REACT_APP_AUTH_USERNAME` and `REACT_APP_AUTH_PASSWORD_HASH` as environment variables in your hosting platform (Vercel, Netlify, etc.).
- Run `npm run build` and deploy the `build/` folder.
- All routes are client-side — configure your host to serve `index.html` for all paths (e.g., Vercel does this automatically).

---

## Author

**Jean Carlos Murillo Vásquez**
Full-Stack Software Engineer | .NET | React | SQL | AI-Enabled Solutions
Costa Rica

- GitHub: [github.com/glimo17](https://github.com/glimo17)
- Email: glimo17@gmail.com
