import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import List "mo:core/List";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Run migration automatically on upgrade.

actor {
  // Types
  type Registration = {
    teamLeaderName : Text;
    collegeName : Text;
    department : Text;
    yearOfStudy : Text;
    email : Text;
    phoneNumber : Text;
    teamMembers : [Text];
    projectTitle : Text;
    domain : Text;
    sdgGoalNumber : Text;
    abstract : Text;
  };

  type EventInfo = {
    name : Text;
    organizer : Text;
    college : Text;
    eventDate : Text;
    description : Text;
  };

  type TimelineStage = {
    stageName : Text;
    date : Text;
  };

  type ContactInfo = {
    name : Text;
    role : Text;
    phoneNumber : Text;
    email : Text;
  };

  type Domain = {
    name : Text;
    description : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  
  // Include authorization mixin
  include MixinAuthorization(accessControlState);

  // Data Storage
  let registrations = Map.empty<Text, Registration>();
  let timelineStages = Map.empty<Text, TimelineStage>();
  let contacts = Map.empty<Text, ContactInfo>();
  let domains = Map.empty<Text, Domain>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Now var so it can be changed by admin.
  var eventInfo : EventInfo = {
    name = "National Level Project Expo 2026";
    organizer = "Department of ECE";
    college = "XYZ College";
    eventDate = "2026-05-15";
    description = "A national level project expo for innovative ideas and solutions.";
  };

  var domainCounter = 0;

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public Functions - Team Registration (open to all including guests)
  public shared ({ caller }) func registerTeam(registration : Registration) : async Text {
    let id = registration.email;
    if (registrations.containsKey(id)) {
      Runtime.trap("Registration already exists for this email");
    };
    registrations.add(id, registration);
    "Registration successful";
  };

  public query ({ caller }) func getRegistration(id : Text) : async Registration {
    switch (registrations.get(id)) {
      case (null) { Runtime.trap("Registration not found") };
      case (?registration) { registration };
    };
  };

  public query ({ caller }) func getAllRegistrations() : async [Registration] {
    let iter = registrations.values();
    let list = List.empty<Registration>();
    iter.forEach(func(reg) { list.add(reg) });
    list.toArray();
  };

  public query ({ caller }) func getEventInfo() : async EventInfo {
    eventInfo;
  };

  // Admin-only: Adding domains
  public shared ({ caller }) func addDomain(name : Text, description : Text) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add domains");
    };
    let domain : Domain = { name; description };
    domains.add(name, domain);
    "Domain added";
  };

  public query ({ caller }) func getAllDomains() : async [Domain] {
    let domainArray = domains.values().toArray();
    domainArray;
  };

  // Admin-only: Adding timeline stages
  public shared ({ caller }) func addTimelineStage(stageName : Text, date : Text) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add timeline stages");
    };
    let stage : TimelineStage = { stageName; date };
    timelineStages.add(stageName, stage);
    "Timeline stage added";
  };

  public query ({ caller }) func getAllTimelineStages() : async [TimelineStage] {
    let stageArray = timelineStages.values().toArray();
    stageArray;
  };

  // Admin-only: Adding contact info
  public shared ({ caller }) func addContactInfo(contact : ContactInfo) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add contact info");
    };
    contacts.add(contact.name, contact);
    "Contact info added";
  };

  public query ({ caller }) func getAllContacts() : async [ContactInfo] {
    let contactArray = contacts.values().toArray();
    contactArray;
  };

  public query ({ caller }) func getRegistrationCount() : async Nat {
    registrations.size();
  };

  // ADMIN ONLY Functions
  public shared ({ caller }) func updateEventInfo(info : EventInfo) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    eventInfo := info;
    "Event info updated";
  };

  public shared ({ caller }) func deleteDomain(name : Text) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not domains.containsKey(name)) {
      Runtime.trap("Domain not found");
    };
    domains.remove(name);
    "Domain deleted";
  };

  public shared ({ caller }) func updateDomain(oldName : Text, domain : Domain) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not domains.containsKey(oldName)) {
      Runtime.trap("Domain not found");
    };
    domains.remove(oldName);
    domains.add(domain.name, domain);
    "Domain updated";
  };

  public shared ({ caller }) func deleteTimelineStage(stageName : Text) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not timelineStages.containsKey(stageName)) {
      Runtime.trap("Timeline stage not found");
    };
    timelineStages.remove(stageName);
    "Timeline stage deleted";
  };

  public shared ({ caller }) func updateTimelineStage(oldName : Text, stage : TimelineStage) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not timelineStages.containsKey(oldName)) {
      Runtime.trap("Timeline stage not found");
    };
    timelineStages.remove(oldName);
    timelineStages.add(stage.stageName, stage);
    "Timeline stage updated";
  };

  public shared ({ caller }) func deleteContactInfo(name : Text) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not contacts.containsKey(name)) {
      Runtime.trap("Contact not found");
    };
    contacts.remove(name);
    "Contact deleted";
  };

  public shared ({ caller }) func updateContactInfo(oldName : Text, contact : ContactInfo) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not contacts.containsKey(oldName)) {
      Runtime.trap("Contact not found");
    };
    contacts.remove(oldName);
    contacts.add(contact.name, contact);
    "Contact updated";
  };
};
