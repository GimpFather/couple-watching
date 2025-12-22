import { supabaseClient } from "~/api/client";
import type { Profile } from "~/api/types/profiles";

export const getProfileData = async (authId: string): Promise<Profile> => {
   const response = await supabaseClient.from("Profiles").select("*").eq("authId", authId).single();

   return response.data;
};
