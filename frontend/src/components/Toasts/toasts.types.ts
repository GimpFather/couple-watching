import type { CustomColorOptions } from "@mui/material/styles";

export interface ToastProps {
	id: string | number;
	title: string;
	description?: string;
	button?: {
		label: string;
		onClick: () => void;
	};
	color?: CustomColorOptions;
}
