import { FormattedMessage } from "react-intl";
import InfoSection from "../../General/InfoSection";
import AnimatedEmoji from "../../General/AnimatedEmoji";
import SadEmoji from "../../../assets/lottie/sad.json";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useNavigate } from "react-router";

type EmptyStateFiltersProps = {
   clearFilters: () => void;
};

const EmptyStateFilters = ({ clearFilters }: EmptyStateFiltersProps) => {
   const navigate = useNavigate();

   return (
      <InfoSection
         title={<FormattedMessage id="LIBRARY.EMPTY_STATE.TITLE.FILTER" />}
         subtitle={<FormattedMessage id="LIBRARY.EMPTY_STATE.SUBTITLE.FILTER" />}
         emoji={<AnimatedEmoji emoji={SadEmoji} width={80} height={80} />}
         primaryButton={{
            icon: <ClearAllIcon />,
            caption: <FormattedMessage id="LIBRARY.EMPTY_STATE.BUTTON.PRIMARY.CLEAR_FILTERS" />,
            action: () => clearFilters(),
         }}
         secondaryButton={{
            icon: <LibraryAddIcon />,
            caption: <FormattedMessage id="LIBRARY.EMPTY_STATE.BUTTON.SECONDARY.ADD_MOVIE" />,
            action: () => navigate("/add-movie"),
         }}
      />
   );
};

export default EmptyStateFilters;
