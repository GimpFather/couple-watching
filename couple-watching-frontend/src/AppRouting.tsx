import { Route, Routes } from "react-router";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ExamplePage from "./pages/Example/ExamplePage";
import DefaultLayout from "./components/Layout/DefaultLayout";

const AppRouting = () => {
   return (
      <Routes>
         <Route element={<DefaultLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="example" element={<ExamplePage />} />
            <Route path="add-movie" element={<ExamplePage />} />
         </Route>
      </Routes>
   );
};

export default AppRouting;
