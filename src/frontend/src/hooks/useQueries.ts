import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ContactInfo,
  Domain,
  EventInfo,
  Registration,
  TimelineStage,
} from "../backend.d";
import { useActor } from "./useActor";

export function useEventInfo() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["eventInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getEventInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegistrationCount() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["registrationCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getRegistrationCount();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useAllDomains() {
  const { actor, isFetching } = useActor();
  return useQuery<Domain[]>({
    queryKey: ["domains"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDomains();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllTimelineStages() {
  const { actor, isFetching } = useActor();
  return useQuery<TimelineStage[]>({
    queryKey: ["timelineStages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTimelineStages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllContacts() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactInfo[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllRegistrations() {
  const { actor, isFetching } = useActor();
  return useQuery<Registration[]>({
    queryKey: ["registrations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRegistrations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        // Backend traps when user is not yet registered — treat as non-admin
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterTeam() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (registration: Registration) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerTeam(registration);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrationCount"] });
    },
  });
}

// ─── Admin Mutations ──────────────────────────────────────────────────────────

export function useUpdateEventInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (info: EventInfo) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateEventInfo(info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventInfo"] });
    },
  });
}

export function useAddDomain() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
    }: { name: string; description: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addDomain(name, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
    },
  });
}

export function useUpdateDomain() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      oldName,
      domain,
    }: { oldName: string; domain: Domain }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateDomain(oldName, domain);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
    },
  });
}

export function useDeleteDomain() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteDomain(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
    },
  });
}

export function useAddTimelineStage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      stageName,
      date,
    }: { stageName: string; date: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTimelineStage(stageName, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelineStages"] });
    },
  });
}

export function useUpdateTimelineStage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      oldName,
      stage,
    }: { oldName: string; stage: TimelineStage }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateTimelineStage(oldName, stage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelineStages"] });
    },
  });
}

export function useDeleteTimelineStage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stageName: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTimelineStage(stageName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelineStages"] });
    },
  });
}

export function useAddContactInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (contact: ContactInfo) => {
      if (!actor) throw new Error("Not connected");
      return actor.addContactInfo(contact);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useUpdateContactInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      oldName,
      contact,
    }: { oldName: string; contact: ContactInfo }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateContactInfo(oldName, contact);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useDeleteContactInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteContactInfo(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
