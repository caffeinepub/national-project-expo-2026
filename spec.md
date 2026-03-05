# National Project Expo 2026

## Current State
Multi-page event website with Home, About, Domains, Timeline, Registration, Screening, and Contact pages. Admin dashboard at `/admin` uses a frontend password (`Akash@1206`) to gate access. However, all backend write functions (updateEventInfo, addDomain, updateDomain, deleteDomain, addTimelineStage, etc.) use `AccessControl.isAdmin` which requires Internet Identity — so all admin save attempts fail with "Unauthorized" because the frontend password login does not authenticate with Internet Identity.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Backend: Remove all `AccessControl.isAdmin` checks from content management functions (updateEventInfo, addDomain, updateDomain, deleteDomain, addTimelineStage, updateTimelineStage, deleteTimelineStage, addContactInfo, updateContactInfo, deleteContactInfo). These should be open public functions — the frontend password already guards access to those operations.
- Backend: Remove the authorization mixin entirely since it's no longer needed.

### Remove
- Backend: Remove import of MixinAuthorization and AccessControl modules.
- Backend: Remove all admin permission checks on write operations.

## Implementation Plan
1. Regenerate backend Motoko code without authorization module — all write functions are open public endpoints, protected only by the frontend admin password.
2. Keep all existing data types and query functions unchanged.
3. Keep registerTeam open to all (no auth required).
4. Deploy updated backend and frontend.
