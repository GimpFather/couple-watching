import { supabaseClient } from "~/api/client";
import type { Profile } from "~/api/types/profiles";

export const getProfileData = async (authId: string): Promise<Profile> => {
   const response = await supabaseClient.from("Profiles").select("*").eq("authId", authId).single();

   return response.data;
};

export const updateProfileData = async (authId: string, data: Pick<Profile, "username">): Promise<Profile | null> => {
   const response = await supabaseClient.from("Profiles").update(data).eq("authId", authId).single();

   return response.data;
};
