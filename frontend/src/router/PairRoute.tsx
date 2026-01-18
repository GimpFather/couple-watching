import { Navigate, Outlet } from "react-router";
import { useGetMyPairWithProfiles } from "~/api/hooks/pairs";
import LoadingPage from "~/components/Layout/LoadingPage";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";

const PairRoute = () => {
    const { id: authId } = useRequiredAuth();
    const { data: pairData, isLoading: isLoadingPairData } = useGetMyPairWithProfiles(authId);

    if (isLoadingPairData) {
        return <LoadingPage />;
    }

    if (pairData === null) {
        return <Navigate to="/customization/pairing" replace />;
    }

    return <Outlet />;
};

export default PairRoute;
