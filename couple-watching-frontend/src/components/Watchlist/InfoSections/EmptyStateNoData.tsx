import InfoSection from "../../General/InfoSection";
import AnimatedEmoji from "../../General/AnimatedEmoji";
import PopcornEmoji from "../../../assets/lottie/popcorn.json";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";

const EmptyStateNoData = () => {
   const navigate = useNavigate();

   return (
      <InfoSection
         title={<FormattedMessage id="LIBRARY.EMPTY_STATE.TITLE.NO_DATA" />}
         subtitle={<FormattedMessage id="LIBRARY.EMPTY_STATE.SUBTITLE.NO_DATA" />}
         emoji={<AnimatedEmoji emoji={PopcornEmoji} width={80} height={80} />}
         primaryButton={{
            icon: <LibraryAddIcon />,
            caption: <FormattedMessage id="LIBRARY.EMPTY_STATE.BUTTON.PRIMARY.ADD_MOVIE" />,
            action: () => navigate("/add-movie"),
         }}
      />
   );
};

export default EmptyStateNoData;
