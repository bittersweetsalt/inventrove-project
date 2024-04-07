import { Grid, Card, Box, Typography, Image } from "@mui/material";
import Icon from "@mui/material";

function ProfilePic(props) {

    //Query Logic 

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            // sx={{ minHeight: '100vh' }}
            >

            {/* Profile Pic */}

            <Grid item xs={0}>
                <Box
                    component="img"
                    sx={{
                        borderRadius: 45,
                        height: 100,
                        width: 100,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="Profile Pictures."
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />
            </Grid>
            <Grid item xs={3} sx={{pb: 5}}>
                <Typography variant="body1">
                    Nathan Fielding
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ProfilePic;

// How it should look:
// profile pic
// name
// role
// online or offline
// possible alert status 