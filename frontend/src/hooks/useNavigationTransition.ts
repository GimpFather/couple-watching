import { useCallback } from "react";
import { useNavigate } from "react-router";
import { playSound } from "~/hooks/useSound";

export const useNavigationTransition = () => {
	const navigate = useNavigate();

	const handleNavigationTransition = useCallback(
		(path: string) => {
			playSound("TRANSITION_1");
			navigate(path);
		},
		[navigate],
	);

	return handleNavigationTransition;
};
