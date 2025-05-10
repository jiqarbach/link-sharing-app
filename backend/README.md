# Express + Hasura Auth & CRUD Backend

This backend provides:
- JWT-based authentication
- Link CRUD with Hasura GraphQL
- Profile upsert and fetch
- Protected routes via middleware

## Setup

1. Run migrations:
   ```
   psql -f migrations/init.sql
   ```
2. Configure `.env` from `.env.example`.
3. In Hasura Console > Settings, set:
   ```json
   {"type":"HS256","key":"<your JWT_SECRET>"}
   ```
4. Define permissions for role `user` on `links` and `profiles` with rule `{ user_id: { _eq: "X-Hasura-User-Id" } }`.
5. Install & run:
   ```
   npm install
   npm run dev
   ```

## API Endpoints

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`

### Links (Protected)
- GET `/api/links/`
- POST `/api/links/`
- PUT `/api/links/:id`
- DELETE `/api/links/:id`
- POST `/api/links/reorder`

### Profile (Protected)
- GET `/api/profile/`
- POST `/api/profile/`
