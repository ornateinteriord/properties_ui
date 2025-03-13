import { SideBarMenuItemType } from "../../../types";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from "@mui/icons-material/Person";


export const AdminSideBarMenuItems: SideBarMenuItemType[] = [
    {
        name: "Dashboard",
        icon: <DashboardIcon sx={{color:"#150b83c1"}} />,
        path: "/admin/dashboard",
        isExpandable: false,
      },
    {
        name: "Proprties",
        icon: <PersonIcon sx={{color:"#150b83c1"}}/>,
        path: "/admin/properties",
        isExpandable: false,
      },
    {
        name: "Users",
        icon: <PersonIcon sx={{color:"#150b83c1"}}/>,
        path: "/admin/users",
        isExpandable: false,
      },
]