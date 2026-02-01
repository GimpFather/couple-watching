import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import ProtectedRoute from "~/router/ProtectedRoute";
import ToolbarLayout from "~/components/Layout/Toolbar/ToolbarLayout";
import WelcomePage from "~/views/Auth/WelcomePage.view";
import AuthLoginPage from "~/views/Auth/AuthLoginPage.view";
import AuthRegisterPage from "~/views/Auth/AuthRegisterPage.view";
import HomePage from "~/views/HomePage.view";
import WatchlistPage from "~/views/WatchlistPage.view";
import StatisticsPage from "~/views/StatisticsPage.view";
import CouplePage from "~/views/CouplePage.view";
import AuthConfirmEmailPage from "~/views/Auth/AuthConfirmEmail.view";
import AuthSuccessPage from "~/views/Auth/AuthSuccess.view";
import CustomizationPage from "~/views/Onboarding/CustomizationPage.view";
import PairingPage from "~/views/Onboarding/PairingPage.view";
import PairRoute from "./PairRoute";
import PairingSuccessPage from "~/views/Onboarding/PairingSuccessPage.view";

const AppRouting = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait" initial={false}>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<WelcomePage />} key="welcome" />
				<Route path="auth/login" element={<AuthLoginPage />} key="auth-login" />
				<Route
					path="auth/register"
					element={<AuthRegisterPage />}
					key="auth-register"
				/>
				<Route
					path="auth/confirm-email"
					element={<AuthConfirmEmailPage />}
					key="auth-confirm-email"
				/>
				<Route element={<ProtectedRoute />}>
					<Route
						path="auth/success"
						element={<AuthSuccessPage />}
						key="auth-success"
					/>
					<Route
						path="customization/profile"
						element={<CustomizationPage />}
						key="onboarding-customization"
					/>
					<Route
						path="customization/pairing"
						element={<PairingPage />}
						key="onboarding-pairing"
					/>
					<Route element={<PairRoute />}>
						<Route
							path="customization/success"
							element={<PairingSuccessPage />}
							key="obording-success"
						/>
						<Route element={<ToolbarLayout />}>
							<Route path="home" element={<HomePage />} key="home" />
							<Route
								path="watchlist"
								element={<WatchlistPage />}
								key="watchlist"
							/>
							<Route
								path="statistics"
								element={<StatisticsPage />}
								key="statistics"
							/>
							<Route path="couple" element={<CouplePage />} key="couple" />
						</Route>
					</Route>
				</Route>
			</Routes>
		</AnimatePresence>
	);
};

export default AppRouting;
