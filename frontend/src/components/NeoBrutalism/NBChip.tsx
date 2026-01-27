import { memo } from "react";
import { styled } from "@mui/material/styles";
import Chip, { type ChipProps } from "@mui/material/Chip";

const CustomChip = styled(Chip, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active, icon }) => ({
    border: '0.094rem solid',
    borderColor: active ? theme.palette.common.black : theme.palette.accent[50],
    borderRadius: "12px",
    backgroundColor: active ? theme.palette.accent[100] : theme.palette.accent[50],
    color: active ? theme.palette.common.black : theme.palette.accent[500],
    cursor: 'pointer',
    "&:hover": {
        backgroundColor: theme.palette.accent[100],
        color: theme.palette.common.black,
        "& .MuiChip-icon": {
            color: theme.palette.common.black,
        }
    },
    "& .MuiChip-icon": {
        marginLeft: 12,
        marginRight: 0,
        width: 20,
        height: 20,
        color: active ? theme.palette.common.black : theme.palette.accent[500],
    },
    "& .MuiChip-label": {
        ...theme.typography.emphasizedBodyMedium,
        padding: icon ? '0px 12px 0px 4px' : "0px 12px",
    }
}));

type CustomChipProps = ChipProps;

interface NBChipProps extends CustomChipProps {
    active: boolean;
}

const NBChip = ({ active, ...props }: NBChipProps) => {
    return <CustomChip disableRipple active={active} {...props} />;
};

export default memo(NBChip);
