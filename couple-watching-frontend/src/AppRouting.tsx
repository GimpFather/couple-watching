import { Route, Routes } from "react-router";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ExamplePage from "./pages/Example/ExamplePage";
import DefaultLayout from "./components/Layout/DefaultLayout";
import WatchlistPage from "./pages/Watchlist/WatchlistPage";
import StarterPage from "./pages/Starter/StarterPage";

const AppRouting = () => {
   return (
      <Routes>
         <Route path="hello" element={<StarterPage />} />
         <Route element={<DefaultLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="add-movie" element={<ExamplePage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
         </Route>
      </Routes>
   );
};

export default AppRouting;
