import { Navigate, Outlet } from "react-router";
import { useGetMyPairWithProfiles } from "~/api/hooks/pairs";
import LoadingPage from "~/components/Layout/LoadingPage";

const PairRoute = () => {
    const { data: pairData, isLoading: isLoadingPairData } = useGetMyPairWithProfiles();

    if (isLoadingPairData) {
        return <LoadingPage />;
    }

    if (!pairData) {
        return <Navigate to="/customization/pairing" replace />;
    }

    return <Outlet />;
};

export default PairRoute;
