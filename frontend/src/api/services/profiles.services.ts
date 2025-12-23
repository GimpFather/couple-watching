import { supabaseClient } from "~/api/client";
import type { Profile } from "~/api/types/profiles";
import { keysToCamel } from "~/utils/utils";

export const getProfileData = async (authId: string): Promise<Profile> => {
   const { data, error } = await supabaseClient.from("profiles").select("*").eq("auth_id", authId).single();

   if (error) {
      throw error;
   }

   return keysToCamel(data);
};

export const updateProfileData = async (authId: string, data: Pick<Profile, "username">) => {
   const { error } = await supabaseClient.from("profiles").update(data).eq("auth_id", authId);
   if (error) {
      throw error;
   }
};
