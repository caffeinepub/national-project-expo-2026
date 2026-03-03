# National Project Expo 2026

## Current State

Full event website with 7 pages (Home, About, Domains, Timeline, Register, Screening, Contact) and an admin panel at `/admin`. Admin panel uses Internet Identity for authentication. The first authenticated user who provides the correct admin secret token becomes admin. Admin can edit event info (college name, event date), timeline stages, domains, and coordinator contacts.

## Requested Changes (Diff)

### Add
- Display admin contact email `athiakash1977@gmail.com` on the admin login screen so the designated admin knows they are the owner of this panel.
- Admin setup instructions: after logging in, show a clear step explaining that the admin must enter the setup token once to claim admin rights.

### Modify
- Admin login screen: add a note showing the designated admin email `athiakash1977@gmail.com` and improve the setup flow guidance.
- The "Not Authorized" screen: show a message directing unauthorized users to contact `athiakash1977@gmail.com`.

### Remove
- Nothing removed.

## Implementation Plan

1. Update `AdminPage.tsx` login screen to show `athiakash1977@gmail.com` as the designated admin contact.
2. Update the Not Authorized screen to mention `athiakash1977@gmail.com` for contact.
3. Add admin first-time setup section: after login, if the user is not yet admin, show an input to enter the setup token to claim admin access (calling `_initializeAccessControlWithSecret`).
