import { Stack, Typography } from "@mui/material";

type PageTitleProps = {
   title: string;
   subtitle: string;
};

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
   return (
      <Stack spacing={0.5}>
         <Typography color="primary" variant="h3">
            {title}
         </Typography>
         <Typography variant="h6">{subtitle}</Typography>
      </Stack>
   );
};

export default PageTitle;
