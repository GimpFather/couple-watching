import { memo } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const CustomTextField = styled(InputBase)(({ theme }) => ({
	padding: "7.5px 12px",
	border: `0.094rem solid ${theme.palette.common.black}`,
	borderRadius: 12,
	backgroundColor: theme.palette.accent[50],
	color: theme.palette.common.black,
	"& .MuiInputBase-input": {
		...theme.typography.emphasizedBodyMedium,
		padding: 0,
	},
	"& .MuiInputBase-input::placeholder": {
		opacity: 1,
		color: theme.palette.accent[500],
	},
	"&.Mui-focused .MuiInputAdornment-root": {
		color: theme.palette.common.black,
	},
}));

const CustomInputAdornment = styled(InputAdornment)(({ theme }) => ({
	color: theme.palette.accent[500],
	marginLeft: 0,
}));

const NBSearchBox = ({ ...props }: InputBaseProps) => {
	return (
		<CustomTextField
			startAdornment={
				<CustomInputAdornment position="start">
					<MagnifyingGlassIcon size={20} />
				</CustomInputAdornment>
			}
			{...props}
		/>
	);
};

export default memo(NBSearchBox);
