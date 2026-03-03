# National Project Expo 2026

## Current State
The app has a full admin panel at `/admin` with tabs for Dashboard, Event Info, Timeline, Domains, Contacts, and Registrations. Admin access uses Internet Identity login + an auto-activate flow (`AdminSetupScreen`) that calls `_initializeAccessControlWithSecret("")` to make the first logged-in user an admin. The designated admin email is `athiakash1977@gmail.com` (displayed in UI). There is no verification code step.

## Requested Changes (Diff)

### Add
- A verification code step during admin setup/first-time login
- Backend: a `generateAdminVerificationCode()` function that generates a 6-digit code, stores it, and returns it only if no admin has been claimed yet
- Backend: a `claimAdminWithCode(code: Text)` function that checks the submitted code matches the stored one and then grants admin role to the caller
- Frontend: `AdminSetupScreen` replaced with a two-step verification flow:
  1. Step 1: Show a generated 6-digit verification code on screen (simulating "your code has been sent") and prompt the user to enter it
  2. Step 2: On correct code entry, call `claimAdminWithCode` to grant admin access
  3. If code is wrong, show an error and allow retry

### Modify
- `AdminSetupScreen` component: replace auto-activate logic with the verification code UI flow
- Backend `main.mo`: add `generateAdminVerificationCode` and `claimAdminWithCode` endpoints

### Remove
- The auto-activate call to `_initializeAccessControlWithSecret("")` from `AdminSetupScreen`

## Implementation Plan
1. Update `main.mo`: add stable var to store verification code, add `generateAdminVerificationCode` (generates/returns code if admin not yet claimed), add `claimAdminWithCode` (validates code, calls `_initializeAccessControlWithSecret` internally to grant admin)
2. Regenerate backend types (`backend.d.ts`)
3. Update `AdminPage.tsx`: replace `AdminSetupScreen` with a verification-code-entry UI flow that first fetches the code, displays it, asks user to type it in, then submits to `claimAdminWithCode`
