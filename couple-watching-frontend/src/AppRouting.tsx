import { Route, Routes } from "react-router";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ExamplePage from "./pages/AddMovie/AddMovie";
import DefaultLayout from "./components/Layout/DefaultLayout";
import WatchlistPage from "./pages/Watchlist/WatchlistPage";
import StarterPage from "./pages/Starter/StarterPage";
import ProtectedRoute from "./components/General/Auth/ProtectedRoute";
import AuthPage from "./pages/Auth/AuthPage";

const AppRouting = () => {
   return (
      <Routes>
         <Route path="/" element={<StarterPage />} />
         <Route path="auth" element={<AuthPage />} />
         <Route element={<ProtectedRoute />}>
            <Route element={<DefaultLayout />}>
               <Route path="dashboard" element={<DashboardPage />} />
               <Route path="add-movie" element={<ExamplePage />} />
               <Route path="watchlist" element={<WatchlistPage />} />
            </Route>
         </Route>
      </Routes>
   );
};

export default AppRouting;
