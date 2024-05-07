
import { Box } from "@mui/material";
import SideBar from "./navbar";
import SearchAppBar from "../topnavbar";

export default function Layout({ children }) {
    return (

        <Box
            display="grid"
            gridTemplateColumns="15% 85%" // 15% for the first column, 85% for the second column
            minHeight="100vh" // Set minimum height to 100% of the viewport height
        >
            <Box>
                <SideBar></SideBar>
            </Box>
            
            <Box bgcolor="#c2c2ff" sx={{ width: '100%', height: "100%", minHeight: '100vh' }}>
                <SearchAppBar></SearchAppBar>
                {children}
            </Box>
        </Box>
    );
  }
  