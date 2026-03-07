# National Project Expo 2026

## Current State
Full event website with 7 pages (Home, About, Domains, Timeline, Registration, Screening, Contact) and an admin panel at `/admin`. The admin panel uses a two-step login: password (`Akash@1206`) + Internet Identity. 

The core problem: the backend uses `_initializeAccessControlWithSecret` which requires matching a `CAFFEINE_ADMIN_TOKEN` environment variable. Since the user cannot access this token, logging in always registers them as a regular user (not admin), causing all admin write operations to fail with "Unauthorized".

## Requested Changes (Diff)

### Add
- Backend function `claimAdminIfFirst`: any non-anonymous authenticated user who calls this when no admin has been assigned yet automatically becomes admin. Returns `true` if they are now admin, `false` if an admin already exists.
- Backend function `isAdminAssigned`: public query to check if any admin has been set yet.

### Modify
- Replace the token-based initialization (`_initializeAccessControlWithSecret`) with automatic first-caller-wins admin assignment (`claimAdminIfFirst`).
- Simplify `access-control.mo`: remove token comparison entirely. First non-anonymous caller to `claimAdmin` becomes admin automatically.
- `AdminPage.tsx`: remove password step and token step entirely. Show only "Login with Internet Identity" button. After login, call `claimAdminIfFirst` -- if admin is returned, show dashboard. If not admin and another admin already exists, show "Access Denied". 

### Remove
- Password gate (`Akash@1206`) from admin login UI -- no longer needed
- Token setup step from admin login UI -- no longer needed
- All references to `CAFFEINE_ADMIN_TOKEN` in the frontend flow

## Implementation Plan
1. Regenerate backend with `claimAdminIfFirst` and `isAdminAssigned` functions, removing token-based auth
2. Update `AdminPage.tsx` to use simplified single-button login flow: Login with II -> call claimAdminIfFirst -> show dashboard or access denied
3. Keep all existing admin dashboard tabs (Event Info, Timeline, Domains, Contacts, Registrations) unchanged
