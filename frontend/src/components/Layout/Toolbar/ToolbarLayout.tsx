import { Outlet } from "react-router";
import Toolbar from "~/components/Layout/Toolbar/Toolbar";

const ToolbarLayout = () => {
   return (
      <>
         <Outlet />
         <Toolbar />
      </>
   );
};

export default ToolbarLayout;
