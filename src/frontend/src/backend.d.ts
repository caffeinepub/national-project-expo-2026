import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TimelineStage {
    date: string;
    stageName: string;
}
export interface EventInfo {
    organizer: string;
    name: string;
    description: string;
    college: string;
    eventDate: string;
}
export interface Registration {
    domain: string;
    collegeName: string;
    email: string;
    teamMembers: Array<string>;
    projectTitle: string;
    abstract: string;
    sdgGoalNumber: string;
    department: string;
    phoneNumber: string;
    yearOfStudy: string;
    teamLeaderName: string;
}
export interface ContactInfo {
    name: string;
    role: string;
    email: string;
    phoneNumber: string;
}
export interface Domain {
    name: string;
    description: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addContactInfo(contact: ContactInfo): Promise<string>;
    addDomain(name: string, description: string): Promise<string>;
    addTimelineStage(stageName: string, date: string): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteContactInfo(name: string): Promise<string>;
    deleteDomain(name: string): Promise<string>;
    deleteTimelineStage(stageName: string): Promise<string>;
    getAllContacts(): Promise<Array<ContactInfo>>;
    getAllDomains(): Promise<Array<Domain>>;
    getAllRegistrations(): Promise<Array<Registration>>;
    getAllTimelineStages(): Promise<Array<TimelineStage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEventInfo(): Promise<EventInfo>;
    getRegistration(id: string): Promise<Registration>;
    getRegistrationCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerTeam(registration: Registration): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setRegisteredTeamsCount(count: bigint): Promise<string>;
    updateContactInfo(oldName: string, contact: ContactInfo): Promise<string>;
    updateDomain(oldName: string, domain: Domain): Promise<string>;
    updateEventInfo(info: EventInfo): Promise<string>;
    updateTimelineStage(oldName: string, stage: TimelineStage): Promise<string>;
}
