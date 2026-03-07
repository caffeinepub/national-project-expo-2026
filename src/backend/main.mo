import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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

  // Data Storage
  let registrations = Map.empty<Text, Registration>();
  let timelineStages = Map.empty<Text, TimelineStage>();
  let contacts = Map.empty<Text, ContactInfo>();
  let domains = Map.empty<Text, Domain>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // var to allow admin updates
  var eventInfo : EventInfo = {
    name = "National Level Project Expo 2026";
    organizer = "Department of ECE";
    college = "XYZ College";
    eventDate = "2026-05-15";
    description = "A national level project expo for innovative ideas and solutions.";
  };

  var domainCounter = 0;

  // Manually adjustable registered teams count.
  var manualRegisteredTeamsCount : Nat = 0;

  // User Profile Management Functions
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

  // Register Team - Open to All (including guests)
  public shared ({ caller }) func registerTeam(registration : Registration) : async Text {
    let id = registration.email;
    registrations.add(id, registration);
    "Registration successful";
  };

  // Get specific registration - Admin only
  public query ({ caller }) func getRegistration(id : Text) : async Registration {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view individual registrations");
    };
    switch (registrations.get(id)) {
      case (null) {
        Runtime.trap("No registration found for id: " # id);
      };
      case (?registration) { registration };
    };
  };

  // Get all registrations - Admin only
  public query ({ caller }) func getAllRegistrations() : async [Registration] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all registrations");
    };
    let iter = registrations.values();
    let list = List.empty<Registration>();
    iter.forEach(func(reg) { list.add(reg) });
    list.toArray();
  };

  // Get event info - Public (no auth check)
  public query ({ caller }) func getEventInfo() : async EventInfo {
    eventInfo;
  };

  // Update event info - Admin only
  public shared ({ caller }) func updateEventInfo(info : EventInfo) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update event info");
    };
    eventInfo := info;
    "Event info updated";
  };

  // Add new domain - Admin only
  public shared ({ caller }) func addDomain(name : Text, description : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add domains");
    };
    let domain : Domain = { name; description };
    domains.add(name, domain);
    "Domain added";
  };

  // Get all domains - Public (no auth check)
  public query ({ caller }) func getAllDomains() : async [Domain] {
    domains.values().toArray();
  };

  // Update domain - Admin only
  public shared ({ caller }) func updateDomain(oldName : Text, domain : Domain) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update domains");
    };
    domains.remove(oldName);
    domains.add(domain.name, domain);
    "Domain updated";
  };

  // Delete domain - Admin only
  public shared ({ caller }) func deleteDomain(name : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete domains");
    };
    domains.remove(name);
    "Domain deleted";
  };

  // Add timeline stage - Admin only
  public shared ({ caller }) func addTimelineStage(stageName : Text, date : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add timeline stages");
    };
    let stage : TimelineStage = { stageName; date };
    timelineStages.add(stageName, stage);
    "Timeline stage added";
  };

  // Get all timeline stages - Public (no auth check)
  public query ({ caller }) func getAllTimelineStages() : async [TimelineStage] {
    timelineStages.values().toArray();
  };

  // Update timeline stage - Admin only
  public shared ({ caller }) func updateTimelineStage(oldName : Text, stage : TimelineStage) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update timeline stages");
    };
    timelineStages.remove(oldName);
    timelineStages.add(stage.stageName, stage);
    "Timeline stage updated";
  };

  // Delete timeline stage - Admin only
  public shared ({ caller }) func deleteTimelineStage(stageName : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete timeline stages");
    };
    timelineStages.remove(stageName);
    "Timeline stage deleted";
  };

  // Add contact info - Admin only
  public shared ({ caller }) func addContactInfo(contact : ContactInfo) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add contact info");
    };
    contacts.add(contact.name, contact);
    "Contact info added";
  };

  // Get all contacts - Public (no auth check)
  public query ({ caller }) func getAllContacts() : async [ContactInfo] {
    contacts.values().toArray();
  };

  // Update contact info - Admin only
  public shared ({ caller }) func updateContactInfo(oldName : Text, contact : ContactInfo) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update contact info");
    };
    contacts.remove(oldName);
    contacts.add(contact.name, contact);
    "Contact updated";
  };

  // Delete contact info - Admin only
  public shared ({ caller }) func deleteContactInfo(name : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete contact info");
    };
    contacts.remove(name);
    "Contact deleted";
  };

  // Get registration count - Public (returns manual count)
  public query ({ caller }) func getRegistrationCount() : async Nat {
    manualRegisteredTeamsCount;
  };

  // Set registration count - Admin only
  public shared ({ caller }) func setRegisteredTeamsCount(count : Nat) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update the registered teams count");
    };
    manualRegisteredTeamsCount := count;
    "Registered teams count updated";
  };
};
