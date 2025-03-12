import { Grid, Card, Box, Typography, Image } from "@mui/material";
import Icon from "@mui/material";

function ProfilePic(props) {

    //Query Logic 

    return(
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{pb: 6}}
            // sx={{ minHeight: '100vh' }}
            >

            {/* Profile Pic */}

            <Grid item xs={0}  sx={{pr: 2, pl: 2}}>
                <Box
                    component="img"
                    sx={{
                        borderRadius: 45,
                        height: 80,
                        width: 80,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="Profile Pictures."
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                />
            </Grid>
            <Grid item >

                <Typography variant="body1">
                    Nathan Chang
                </Typography>
                <Typography variant="body2">
                    Administrator
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