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
import { useHistory } from "react-router-dom"

function CarouselSongCard({song, userSongs, setUserSongs}){
    let history = useHistory()


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
    const [singableResponse, setSingableResponse] = useState(song.singable)

    // console.log(singableResponse)


    const generateKey = (pre) => {
      return `${ pre }_${ Math.random() }`;
  }

  let lyricList = []
  if (song.lyrics)
    {let arrayStr = song.lyrics.split("\n")
    // console.log(arrayStr)

    lyricList = arrayStr.map(elly => <li key={generateKey(elly)}>{elly}</li>)
    }

    const [open, setOpen] = useState(false);
    const [openLyricsEdit, setOpenLyricsEdit] = useState(false);
    const [openNotesEdit, setOpenNotesEdit] = useState(false);


    let notesList = []
    if (song.notes){
    let notesArry = song.notes.split("\n")


    let notesList = notesArry.map(elly => <li key={generateKey(elly)}>{elly}</li>)
    }
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          border: 'none', 
          shadow: 'none', 
          transition: 'none',
          padding: '0px'
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
                    recording,
                    singable: singableResponse
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
                  if (data.length > 0)
                 { console.log(data.lyrics_body)
                  setLyrics(data.lyrics_body)}
                  else
                  {alert("Sorry! No lyrics found on MusicMatch to import. Let Google be your guide!")}
                })
              }
           
              function searchUltGuitar(){
                window.open(
                        `https://www.ultimate-guitar.com/search.php?search_type=title&value=${song.title}`,
                        '_blank' // <- This is what makes it open in a new window.
                      );
                }
                function handleDelete(){
                  fetch (`/songs/${song.id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then(res => res.json())
                  .then(data => {
                      let filtered = userSongs.filter(item => item.id !== data.id)
                      setUserSongs(filtered)
                      history.push('./')
                })}

    return(
  <div  style={{textAlign: 'left'}}>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    <Card  style={{ textAlign: 'left', margin: 'auto', boxShadow: 'none', fontFamily:'Reem Kufi', flexDirection: 'column', height: '75vh', width: '75vw', overflow: 'auto'}}> 
        <Grid item container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start">
        <Grid item xs={6}>
            <h4>Title: {song.title}</h4>
        </Grid>
        <Grid item xs={6}>
            <h4>Artist: {song.artist}</h4>
        </Grid>
        {/* <Grid item xs={3}>
            <h4>Genre: {song.genre}</h4>
        </Grid> */}
        {/* <Grid item xs={3}>
            <h4>Is this a singable song? {song.singable? 'Yes': 'No'}</h4>
        </Grid> */}
              <Grid item xs={6}>
                    
                    <h4>My Ability Level: {song.my_ability_level}</h4>
                </Grid>
                {/* <Grid item xs={1}></Grid> */}
        <Grid item xs={6}>
             <h4>Year Learned: {song.year_learned}</h4>
        </Grid>

<Grid item xs={12} style={{alignItems: 'left'}} >
            <Accordion style={{ boxShadow: "none" }}  >
                <AccordionSummary className={classes.root}  >
                    <Typography className={classes.heading} > Show Notes </Typography>
                </AccordionSummary>
                    <AccordionDetails className={classes.root}  style={{ display: "block" }}>
                    
                             <ul style={{textAlign: "left",listStyleType: "none"}}>
                             {notesList}
                             </ul>
                
            
         
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
            <Accordion style={{ boxShadow: "none" }}  >
                <AccordionSummary className={classes.root} >
                    <Typography className={classes.heading} > Show Lyrics</Typography>
                </AccordionSummary>
                    <AccordionDetails className={classes.root} style={{ display: "block" }}>
                 
                             <ul style={{textAlign: "left",listStyleType: "none"}}>
                             {lyricList}
                             </ul>
                
                
         
                        <Button className="gameButton" onClick={handleClickLyricsEditOpen}>
                                Add, Edit, or Import Lyrics
                              </Button>
                              <br/>
                        {/* <Button className="gameButton" onClick={handleImportLyrics}>
                                Click to Import Lyrics
                              </Button> */}
                              <br/>
      <ThemeProvider theme={theme}>
      <Dialog style={{fontFamily: 'Reem Kufi', color: 'black'}}
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
          <Button className="gameButton" onClick={handleImportLyrics}>
                                Click to Import Lyrics
                              </Button>
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
        <AccordionSummary className={classes.root} >
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
        
        <Grid item xs={4}>
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

                <div>
                <label >Singable?</label>
                <label style={{marginLeft: '10px'}}>No</label>
                <input style={{marginLeft: '10px'}} type="radio" id="no" name="singable" value="false" defaultChecked={!singableResponse} onClick={() => setSingableResponse(false)}/>
                <label style={{marginLeft: '10px'}}>Yes</label>
                <input style={{marginLeft: '10px'}} type="radio" id="yes" name="singable" value="true" defaultChecked={singableResponse} onClick={() => setSingableResponse(true)}/>
                </div>
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
          <Grid item xs={4}>
                  <Button  className="gameButton" onClick={searchUltGuitar} >Search Ultimate Guitar Tabs</Button>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
                  <Button  className="gameButton" onClick={handleDelete} >Delete</Button>
          </Grid>

        </Grid>   
    </Card>
    </div>
    )
}
export default CarouselSongCard