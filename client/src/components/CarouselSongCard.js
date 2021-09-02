import { Card } from '@material-ui/core'
import { Button } from "react-bootstrap"
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
import DialogTitle from '@material-ui/core/DialogTitle';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function CarouselSongCard({song, userSongs, setUserSongs, handleMoreDetailsFetch}){
  
  const [videoObj] = useState(`https://vimeo.com/api/oembed.json?url=${song.recording}`)
  const [recordingID, setRecordingID] = useState('')
  useEffect( () => {
  
  if (song.recording)
  {fetch(videoObj).then(res => res.json()).then(data => setRecordingID(data.video_id))
  }},[videoObj, song.recording] 
  )

    const [title, setTitle] = useState(song.title)
    const [artist, setArtist] = useState(song.artist)
    const [genre] = useState(song.genre)
    const [ability, setAbility] = useState(song.my_ability_level)
    const [year, setYear] = useState(song.year_learned)
    const [notes, setNotes] = useState(song.notes)
    const [recording, setRecording] = useState(song.recording)
    const [lyrics, setLyrics] = useState(song.lyrics)
    const [singableResponse] = useState(song.singable)
    const [open, setOpen] = useState(false);
    const [openLyricsEdit, setOpenLyricsEdit] = useState(false);
    const [openNotesEdit, setOpenNotesEdit] = useState(false);




    const generateKey = (pre) => {
      return `${ pre }_${ Math.random() }`;
  }

    let lyricList = []
      if (song.lyrics)
      {let arrayStr = song.lyrics.split("\n")


      lyricList = arrayStr.map(elly => <li key={generateKey(elly)}>{elly}</li>)
      }


    let notesList = []
      if (song.notes){
      let notesArry = song.notes.split("\n")


      notesList = notesArry.map(elly => <li key={generateKey(elly)}>{elly}</li>)
      }

    const useStyles = makeStyles((theme) => ({
        roots: {
            '& label.Mui-focused': {
              color: '#000000',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#000000',
            },
            '& .MuiInput-underline:hover:not($disabled):not($focused):not($error):before': {
              borderBottom: `3px solid #000000`
          },
          }, 
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
                handleMoreDetailsFetch(song.id)
              })
            }

            function handleEdit (e) {
                e.preventDefault();
            
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
                    handleMoreDetailsFetch(song.id)
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
                  handleMoreDetailsFetch(song.id) 
                })
              }
            
              function handleImportLyrics(){
                fetch(`/importlyrics?artist=${artist}&title=${title}`)
                .then(res => res.json()).then(data => {
                  if (data.status !== 500)
                 { 
                  setLyrics(data.lyrics_body)}
                  else
                  {alert("Sorry! No lyrics found on MusicMatch to import. Let Google be your guide!")}
                })
              }
           
              function searchUltGuitar(){
                window.open(
                        `https://www.ultimate-guitar.com/search.php?search_type=title&value=${song.title}`,
                        '_blank' 
                      );
                }

                const [tabs, setTabs] = useState(song.tabs)

                function handleAddTabLines () {
                    let tabLines = 
                    '\n \n e------------------------------------------------------------------------------------------------------------------------------------------------------  \n B------------------------------------------------------------------------------------------------------------------------------------------------------  \n G------------------------------------------------------------------------------------------------------------------------------------------------------  \n D------------------------------------------------------------------------------------------------------------------------------------------------------  \n A------------------------------------------------------------------------------------------------------------------------------------------------------  \n E------------------------------------------------------------------------------------------------------------------------------------------------------  \n _________________________________________________________________________________'
                    setTabs(tabs + tabLines)
                  }

                const handleClickTabsEditOpen = () => {
                  setOpenTabsEdit(true);
                };
              
                const handleCloseTabsEdit = () => {
                  setOpenTabsEdit(false);
                };

                const [openTabsEdit, setOpenTabsEdit] = useState(false);

                let tabsList = []
                  if (song.tabs){
                  let tabsArry = song.tabs.split("\n")

                  tabsList = tabsArry.map(elly => <li key={generateKey(elly)}>{elly}</li>)
                  }

                  function handleTabsEdit(e) {
                    e.preventDefault()
                 
    
                    let tabsObj = {
                        tabs
                    }
    
                    fetch (`/editTabs/${song.id}`, { 
                        method: 'PATCH',
                        headers: {
                    'Content-Type': 'application/json'
                }, 
                    body: JSON.stringify(tabsObj)
                    }).then(res => res.json()).then(data => {
                      setOpenTabsEdit(false)
                      setUserSongs(data) 
                      handleMoreDetailsFetch(song.id)
                    })
                  }



                  const [notesExpand, setNotesExpand] = useState(() => {
                    if (song.notes) {return true}
                    else {return false}
                  })
                  const [tabsExpand, setTabsExpand] = useState(() => {
                    if (song.tabs) {return true}
                    else {return false}
                  })
                  const [lyricsExpand, setLyricsExpand] = useState(() => {
                    if (song.lyrics) {return true}
                    else {return false}
                  })

                  const [videoExpand, setVideoExpand] = useState(false)

    return(
  <div  style={{textAlign: 'center'}}>
      <h2>More Details About {song.title}</h2>
    <br/>

    <br/>
    <br/>

    <Card className='songcard' style={{boxShadow: '1px 1px 4px 5px #750000', textAlign: 'center', margin: 'auto', fontFamily:'Reem Kufi', flexDirection: 'column', height: 'auto', width: '61vw', overflow: 'auto'}}> 
        <Grid item container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start">
      <Grid item xs={3} style={{ paddingLeft: '10px'}}>
            <h4>{song.title}</h4>
        </Grid>
        <Grid item xs={3}>
            <h4>Artist: {song.artist}</h4>
        </Grid>
              <Grid item xs={3} style={{ paddingLeft: '10px'}}>
                    
                    <h4>My Ability Level: {song.my_ability_level}</h4>
                </Grid>
                {/* <Grid item xs={1}></Grid> */}
        <Grid item xs={3}>
             <h4>Year Learned: {song.year_learned}</h4>
        </Grid>

      <Grid item xs={12} style={{alignItems: 'left', paddingLeft: '10px'}} >
            <Accordion expanded={notesExpand}  style={{ boxShadow: "none" }}  >
                <AccordionSummary className={classes.root} onClick={() => setNotesExpand(!notesExpand)}  >
                {notesExpand ? <Typography className={classes.heading} > Hide Notes </Typography> : <Typography className={classes.heading} > Show Notes</Typography> }
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


        <Grid item xs={12} style={{alignItems: 'left', paddingLeft: '10px'}} >
            <Accordion expanded={tabsExpand} style={{ boxShadow: "none" }}  >
                <AccordionSummary className={classes.root} onClick={() => setTabsExpand(!tabsExpand)}  >
                {tabsExpand ? <Typography className={classes.heading} > Hide Tabs </Typography> : <Typography className={classes.heading} > Show Tabs</Typography> }
                </AccordionSummary>
                    <AccordionDetails className={classes.root} style={{ display: "block" }}>
                    
                             <ul style={{textAlign: "left",listStyleType: "none"}}>
                             {tabsList}
                             </ul>
                
            
         
                        <Button className="gameButton" onClick={handleClickTabsEditOpen}>
                           Edit or Add Tabs
                </Button>
                <br/>
                <ThemeProvider theme={theme}>
                <Dialog fullWidth={true} maxWidth={'md'}
                  open={openTabsEdit} onClose={handleCloseTabsEdit} aria-labelledby="form-dialog-title">
                    <DialogTitle  id="tabs">Edit or Add Tabs/Chords</DialogTitle>
                      <form onSubmit={handleTabsEdit}>
                        <DialogContent style={{width: '900px', height: '300px'}} >
                            <TextField 
                                  
                                  multiline
                                  id="tabs"
                                  label="Tabs"
                                  type="Multilne"
                                  rows={12}
                                  cols={50}
                                  value={tabs}
                                  fullWidth
                                  onChange={e => setTabs(e.target.value)}
                      
            
                          />
                        </DialogContent>
                        <DialogActions>
                        <Button className="gameButton" onClick={handleAddTabLines}>Add More Tab Lines</Button>
                          <Button onClick={handleCloseTabsEdit}className="gameButton">
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


        <Grid item xs={12} style={{alignItems: 'left', paddingLeft: '10px'}} >
            <Accordion expanded={lyricsExpand}  style={{ boxShadow: "none" }}  >
                <AccordionSummary className={classes.root} onClick={() => setLyricsExpand(!lyricsExpand)} >
                {lyricsExpand ? <Typography className={classes.heading} > Hide Lyrics</Typography> : <Typography className={classes.heading} > Show Lyrics</Typography> }
                </AccordionSummary>
                    <AccordionDetails className={classes.root} style={{ display: "block" }}>
                 
                             <ul style={{textAlign: "left",listStyleType: "none"}}>
                             {lyricList}
                             </ul>
                
                
         
                        <Button className="gameButton" onClick={handleClickLyricsEditOpen}>
                                Add, Edit, or Import Lyrics
                              </Button>
                              <br/>
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


        <Grid item xs={12} style={{ paddingLeft: '10px'}}>
              <Accordion expanded={videoExpand} style={{ boxShadow: "none" }}  >
              <AccordionSummary className={classes.root} onClick={() => setVideoExpand(!videoExpand)}  >
              {videoExpand ? <Typography className={classes.heading} > Hide Video Recording </Typography> : <Typography className={classes.heading} > Show Video Recording</Typography> }
              </AccordionSummary>
              <AccordionDetails>
                <>
                  {recordingID ?
                  <> 
                  <iframe src={`https://player.vimeo.com/video/${recordingID}`} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Test Embed With Some weird music vimeo added!"></iframe>
                  
                  </>
                  : <>
                      <h4>There's no recording on file for this song! </h4>
                      <br/>
                      <h4> Add one via the edit song information button </h4>
                      </> }
                      
                  </>
                  </AccordionDetails>
                  </Accordion>
              </Grid>
              <br/>
              <br/>
              <br/>
              <Grid item xs={6} style={{ paddingLeft: '10px'}}>
              <div>
            <Button className="gameButton" onClick={handleClickOpen}>
              Edit this Song Information
            </Button>
      <Dialog 
          open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle  id="form-dialog-title">Edit Song Information</DialogTitle>
        <form onSubmit={handleEdit}>
        <DialogContent>
          
          <TextField className={classes.roots}
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        fullWidth
          />
           <TextField className={classes.roots}
                        autoFocus
                        margin="dense"
                        id="artist"
                        label="Artist"
                        type="text"
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                        fullWidth
          />

            <TextField className={classes.roots}
                        autoFocus
                        margin="dense"
                        id="ability"
                        label="My Ability Level"
                        type="number"
                        value={ability}
                        onChange={e => setAbility(e.target.value)}
                        fullWidth
                    />


            <TextField className={classes.roots}
                        autoFocus
                        margin="dense"
                        id="year"
                        label="Year Learned"
                        type="number"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        fullWidth
                    />

            <TextField className={classes.roots}
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

               </div>
          </Grid>
          
          <Grid item xs={6}>
                  <Button  className="gameButton" onClick={searchUltGuitar} >Search Ultimate Guitar Tabs</Button>
          </Grid>
          <br/>
          <br/>

        </Grid>   
    </Card>
    </div>
    )
}
export default CarouselSongCard