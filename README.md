# SkillBridge — Frontend

React (Vite) frontend for SkillBridge, wired to a Spring Boot backend.

## Setup

```bash
npm install
cp .env.example .env     # then set VITE_API_BASE_URL to your backend
npm run dev
```

Runs at http://localhost:5173.

## Backend endpoints this expects

Adjust these in `src/api/*.js` to match your actual Spring Boot controllers:

- `POST /auth/signup` → `{ name, email, password }` → `{ token, user }`
- `POST /auth/login` → `{ email, password }` → `{ token, user }`
- `GET  /auth/me` → current user
- `GET  /students/me` → `{ education, skills[], projects[], interests[] }`
- `PUT  /students/me` → saves the same shape
- `GET  /recommendations` → `[{ roleId, title, matchScore, summary }]`
- `GET  /roles/{roleId}/skill-gap` → `{ role, haveSkills[], gapSkills[] }`
- `GET  /roles/{roleId}/roadmap` → `[{ topic, description, resourceUrl }]`

Auth uses a JWT stored in `localStorage` and sent as `Authorization: Bearer <token>`
(see `src/api/client.js`). If your backend uses session cookies instead, swap the
interceptor for `withCredentials: true` and drop the token handling.

## Structure

```
src/
  api/          API calls (auth, profile, careers)
  context/      AuthContext (login state)
  components/   Sidebar, ProtectedRoute
  pages/        Login, Signup, Dashboard, Profile, Recommendations, RoleDetail
  styles/       design tokens + global CSS
```

## CORS

Spring Boot will need to allow `http://localhost:5173` as an origin for local dev.
