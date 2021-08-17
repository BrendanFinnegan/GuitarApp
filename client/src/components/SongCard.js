import { Card } from '@material-ui/core'
import { Button } from "react-bootstrap"
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



  const [videoObj, setVideoObj] = useState(`https://vimeo.com/api/oembed.json?url=${song.recording}`)
  const [recordingID, setRecordingID] = useState('')
  useEffect( () => {
  
  if (song.recording)
  {fetch(videoObj).then(res => res.json()).then(data => setRecordingID(data.video_id))
  }},[videoObj] 
  )


    const [title, setTitle] = useState(song.title)
    const [artist, setArtist] = useState(song.artist)
    const [genre, setGenre] = useState(song.genre)
    const [ability, setAbility] = useState(song.my_ability_level)
    const [year, setYear] = useState(song.year_learned)
    const [notes, setNotes] = useState(song.notes)
    const [recording, setRecording] = useState(song.recording)
    const [lyrics, setLyrics] = useState(song.lyrics)

    // console.log(song.lyrics)

    let arrayStr = song.lyrics.split("\n")
    // console.log(arrayStr)

    let lyricList = arrayStr.map(elly => <li>{elly}</li>)

    const [open, setOpen] = useState(false);
    const [openLyricsEdit, setOpenLyricsEdit] = useState(false);
    const [openNotesEdit, setOpenNotesEdit] = useState(false);

    let notesArry = song.notes.split("\n")


    let notesList = notesArry.map(elly => <li>{elly}</li>)

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
          fontWeight: 'bold', 
          border: 'none', 
          shadow: 'none',
          textDecoration: 'underline'
        },
      }));
      
        const classes = useStyles();
          
            const handleClickOpen = () => {
              setOpen(true);
            };
          
            const handleClose = () => {
              setOpen(false);
            };

            const handleClickLyricsEditOpen = () => {
              setOpenLyricsEdit(true);
            };
          
            const handleCloseLyricsEdit = () => {
              setOpenLyricsEdit(false);
            };


            const handleClickNotesEditOpen = () => {
              setOpenNotesEdit(true);
            };
          
            const handleCloseNotesEdit = () => {
              setOpenNotesEdit(false);
            };

            function handleNotesEdit(e){
              e.preventDefault()
              console.log(e.target)

              let notesObj = {
                  notes
              }

              fetch (`/editNotes/${song.id}`, { 
                  method: 'PATCH',
                  headers: {
              'Content-Type': 'application/json'
          }, 
              body: JSON.stringify(notesObj)
              }).then(res => res.json()).then(data => {
                setOpenNotesEdit(false)
                setUserSongs(data)
              })
            }

            function handleEdit (e) {
                e.preventDefault();
                console.log(e.target.title.value)
                let songObj = {
                    title,
                    artist,
                    genre,
                    my_ability_level: ability,
                    year_learned: year,
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
                    MuiDialog: {
                      paperWidthSm: {
                        width: '600px'
                      }
                    },
                  },
                },
              );
              
              function handleLyricsEdit(e) {
                e.preventDefault()
                console.log(e.target)

                let lyricsObj = {
                    lyrics
                }

                fetch (`/editLyrics/${song.id}`, { 
                    method: 'PATCH',
                    headers: {
                'Content-Type': 'application/json'
            }, 
                body: JSON.stringify(lyricsObj)
                }).then(res => res.json()).then(data => {
                  setOpenLyricsEdit(false)
                  setUserSongs(data) 
                })
              }
            
              function handleImportLyrics(){
                fetch(`/importlyrics?artist=${artist}&title=${title}`)
                .then(res => res.json()).then(data => {
                  console.log(data.lyrics_body)
                  setLyrics(data.lyrics_body)
                })
              }
           
    return(
  
    <Card style={{fontFamily:'Reem Kufi', alignItems:'center', flexDirection: 'column', height: '35vh', width: '75vw', overflow: 'auto'}}> 
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

<Grid item xs={12} style={{alignItems: 'left'}} >
            <Accordion  >
                <AccordionSummary  >
                    <Typography className={classes.heading} > Show Notes </Typography>
                </AccordionSummary>
                    <AccordionDetails style={{ display: "block" }}>
                        <Typography >
                             <ul style={{textAlign: "left",listStyleType: "none"}}>
                             {notesList}
                             </ul>
                
                        </Typography>
         
                        <Button className="gameButton" onClick={handleClickNotesEditOpen}>
        Edit or Add Notes
      </Button>
      <br/>
      <ThemeProvider theme={theme}>
      <Dialog
        open={openNotesEdit} onClose={handleCloseNotesEdit} aria-labelledby="form-dialog-title">
          <DialogTitle  id="notes">Edit or Add Notes</DialogTitle>
            <form onSubmit={handleNotesEdit}>
              <DialogContent >
                  <TextField
                        
                        multiline
                        id="Notes"
                        label="Notes"
                        type="Multilne"
                        rows={6}
                        cols={30}
                        value={notes}
                        fullWidth
                        onChange={e => setNotes(e.target.value)}
                      
            
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotesEdit}className="gameButton">
            Cancel
          </Button>
          <Button type="submit" className="gameButton">
            Save
          </Button>
          
        </DialogActions>
        </form>
      </Dialog>
      </ThemeProvider>

                     </AccordionDetails>
             </Accordion>
        </Grid>
        <Grid item xs={12} style={{alignItems: 'left'}} >
            <Accordion  >
                <AccordionSummary  >
                    <Typography className={classes.heading} > Show Lyrics</Typography>
                </AccordionSummary>
                    <AccordionDetails style={{ display: "block" }}>
                        <Typography >
                             <ul style={{textAlign: "left",listStyleType: "none"}}>
                             {lyricList}
                             </ul>
                
                        </Typography>
         
                        <Button className="gameButton" onClick={handleClickLyricsEditOpen}>
                                Edit or Add Lyrics
                              </Button>
                              <br/>
                        <Button className="gameButton" onClick={handleImportLyrics}>
                                Click to Import Lyrics
                              </Button>
                              <br/>
      <ThemeProvider theme={theme}>
      <Dialog
  open={openLyricsEdit} onClose={handleCloseLyricsEdit} aria-labelledby="form-dialog-title">
        <DialogTitle  id="form-dialog-title">Edit or Add Lyrics</DialogTitle>
        <form onSubmit={handleLyricsEdit}>
        <DialogContent >
          
          <TextField
                        
                        multiline
                        id="standard-textarea"
                        label="Lyrics"
                        type="Multilne"
                        rows={6}
                        cols={30}
                        value={lyrics}
                        fullWidth
                        onChange={e => setLyrics(e.target.value)}
                      
            
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLyricsEdit} className="gameButton">
            Cancel
          </Button>
          <Button type="submit" className="gameButton">
            Save
          </Button>
          
        </DialogActions>
        </form>
      </Dialog>
      </ThemeProvider>

                     </AccordionDetails>
             </Accordion>
        </Grid>
        <Grid item xs={12}>
        <Accordion style={{ boxShadow: "none" }}  >
        <AccordionSummary  >
        <Typography className={classes.heading} > Click for Video Recording </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
            {recordingID ?
            <> 
            <iframe src={`https://player.vimeo.com/video/${recordingID}`} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Test Embed With Some weird music vimeo added!"></iframe>
            
            </>
             : <h4>There's no recording on file for this song. Add one via the edit song information button </h4> }
           
            </>
            </AccordionDetails>
            </Accordion>
        </Grid>

        <Grid item xs={12}>
        <div>
      <Button className="gameButton" onClick={handleClickOpen}>
        Edit this Song Information
      </Button>

      {/* <ThemeProvider> */}
      <Dialog 
  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                        id="recording"
                        label="Vimeo Recording (link example https://vimeo.com/585483154)"
                        type="text"
                        value={recording}
                        onChange={e => setRecording(e.target.value)}
                        fullWidth
                    />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="gameButton">
            Cancel
          </Button>
          <Button type="submit" className="gameButton">
            Save
          </Button>
          
        </DialogActions>
        </form>
      </Dialog>
      {/* </ThemeProvider> */}
    </div>
    </Grid>
        </Grid>   
    </Card>

    )
}
export default SongCard