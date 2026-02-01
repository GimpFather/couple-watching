import { useContext } from "react";
import type { AuthContextType } from "~/context/context.types";
import { AuthContext } from "~/context/auth/AuthContext";

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
