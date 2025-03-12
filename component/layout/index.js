
import { Box, Grid } from "@mui/material";
// import SideBar from "./navbar";
import SidebarNav from "../sidenav";
import SearchAppBar from "../topnavbar";
import BreadcrumbsComponent from "../breadcrumb";

export default function Layout({ children }) {
    return (
        <Box
            display="flex"
            minHeight="100vh"
        >
            {/* Sidebar */}
            <Box bgcolor="#d9f4ff">
                <SidebarNav />
            </Box>
    
            {/* Main Content */}
            <Box
                flexGrow={1} // Takes up remaining space
                sx={{
                    overflow: 'auto',
                    padding: 2,
                }}
                >
                <BreadcrumbsComponent />
                {children}
            </Box>
        </Box>

        // <Box
        //     display="grid"
        //     // gridTemplateColumns="15% 85%" // 15% for the first column, 85% for the second column
        //     minHeight="100vh" // Set minimum height to 100% of the viewport height
        // >
        //     <Box bgcolor="#d9f4ff" >
        //         <Grid
        //             container
        //         >
        //             <Grid item>
        //                 <SidebarNav></SidebarNav>
        //             </Grid>
        //             <Grid item>
        //                 <BreadcrumbsComponent></BreadcrumbsComponent>
        //                 {children}
        //             </Grid>         
        //         </Grid>
        //     </Box>
        // </Box>
    );
  }
  