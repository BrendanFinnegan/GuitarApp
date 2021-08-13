import { Card, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function SongCard({song, setUserSongs}){


    const [title, setTitle] = useState(song.title)
    const [artist, setArtist] = useState(song.artist)
    const [genre, setGenre] = useState(song.genre)
    const [ability, setAbility] = useState(song.my_ability_level)
    const [year, setYear] = useState(song.year_learned)
    const [notes, setNotes] = useState(song.notes)
    const [recording, setRecording] = useState(song.recording)
    


    const [open, setOpen] = useState(false);

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          border: 'none', 
          shadow: 'none', 
          transition: 'none'
        },
        heading: {
          color: 'black',
          fontFamily: 'Reem Kufi', 
          justifyContent: 'center', 
          fontWeight: 'bold', 
          margin: 'auto',
          border: 'none', 
          shadow: 'none'
        },
      }));
      
        const classes = useStyles();
      

            
          
            const handleClickOpen = () => {
              setOpen(true);
            };
          
            const handleClose = () => {
              setOpen(false);
            };

            function handleEdit (e) {
                e.preventDefault();
                console.log(e.target.title.value)
                let songObj = {
                    title,
                    artist,
                    genre,
                    my_ability_level: ability,
                    year_learned: year,
                    notes,
                    recording
                }

                fetch (`/songs/${song.id}`, { 
                    method: 'PATCH',
                    headers: {
                'Content-Type': 'application/json'
            }, 
                body: JSON.stringify(songObj)
                }).then(res => res.json())
                .then(data => {
                    setUserSongs(data)
                    setOpen(false)
                
                })

            }


            const theme = createTheme({
                overrides: {
                    MuiDialog: {},

                  // Style sheet name ⚛️
                  MuiButton: {
                    outlined: {
                        padding: '0px'},
                    // Name of the rule
                    text: {
                      // Some CSS
                      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                      borderRadius: 3,
                      border: 0,
                      color: 'white',
                      height: 48,
                      padding: '0 30px',
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    },
                    textPrimary: {
                        color: 'blue',
                    },
                },
                  },
                },
              );
              
              
            //   function DefaultProps() {
            //     return (
            //       <ThemeProvider theme={theme}>
            //         <Button>Change default props</Button>
            //       </ThemeProvider>
            //     );
            //   }


    return(
  
    <Card style={{fontFamily:'Reem Kufi', alignItems:'center', flexDirection: 'column', height: '50vh', width: '75vw', overflow: 'auto'}}> 
        <Grid item container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start">
        <Grid item xs={3}>
            <h4>Title: {song.title}</h4>
        </Grid>
        <Grid item xs={6}>
            <h4>Artist: {song.artist}</h4>
        </Grid>
        <Grid item xs={3}>
            <h4>Genre: {song.genre}</h4>
        </Grid>
        <Grid item xs={3}>
            <h4>Is this a singable song? {song.singable? 'Yes': 'No'}</h4>
        </Grid>
        <Grid item xs={6}>
                    
            <h4>My Ability Level for this song: {song.my_ability_level}</h4>
        </Grid>

        <Grid item xs={3}>
             <h4>Year Learned: {song.year_learned}</h4>
        </Grid>

        <Grid item xs={12} >
            <Accordion style={{ boxShadow: "none" }}  >
                <AccordionSummary  >
                    <Typography className={classes.heading} > Click to Show Lyrics</Typography>
                </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                             {song.lyrics}
                        </Typography>
                     </AccordionDetails>
             </Accordion>
        </Grid>
        <Grid item xs={12}>
            <h4>Notes: {song.notes}</h4>
        </Grid>
        <Grid item xs={12}>
            <h4>Recording: {song.recording}</h4>
        </Grid>

        <Grid item xs={12}>
        <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit this Song Information
      </Button>

      <ThemeProvider >
      <Dialog style={{width: '200px', marginLeft: '40%', backgroundColor: 'transparent'}}
  overlayStyle={{backgroundColor: 'transparent'}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle  id="form-dialog-title">Edit Song Information</DialogTitle>
        <form onSubmit={handleEdit}>
        <DialogContent>
          {/* <DialogContentText>
            Edit the Song information
          </DialogContentText> */}
          
          <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        fullWidth
          />
           <TextField
                        autoFocus
                        margin="dense"
                        id="artist"
                        label="Artist"
                        type="text"
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                        fullWidth
          />

            <TextField
                        autoFocus
                        margin="dense"
                        id="genre"
                        label="Genre"
                        type="text"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        fullWidth
                    />

            <TextField
                        autoFocus
                        margin="dense"
                        id="ability"
                        label="My Ability Level"
                        type="number"
                        value={ability}
                        onChange={e => setAbility(e.target.value)}
                        fullWidth
                    />


            <TextField
                        autoFocus
                        margin="dense"
                        id="year"
                        label="Year Learned"
                        type="number"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        fullWidth
                    />


            <TextField
                        autoFocus
                        margin="dense"
                        id="notes"
                        label="Notes"
                        type="text"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        fullWidth
                    />

            <TextField
                        autoFocus
                        margin="dense"
                        id="recording"
                        label="recording"
                        type="text"
                        value={recording}
                        onChange={e => setRecording(e.target.value)}
                        fullWidth
                    />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
          
        </DialogActions>
        </form>
      </Dialog>
      </ThemeProvider>
    </div>
    </Grid>
        </Grid>   
    </Card>

    )
}
export default SongCard