import type { User } from "@supabase/supabase-js";
import { useAuth } from "~/context/auth/useAuth";

export const useRequiredAuth = (): User => {
	const { user } = useAuth();

	if (!user) {
		throw new Error("useRequiredAuth must be used when user is authenticated");
	}

	return user;
};
