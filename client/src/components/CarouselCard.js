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




function CarouselCard({song, currentUser, setInterestedSongs, userSongs, setUserSongs}) {

    const [title, setTitle] = useState(song.title)
    const [artist, setArtist] = useState(song.artist)
    const [genre, setGenre] = useState(song.genre)
    const [ability, setAbility] = useState(song.my_ability_level)
    const [year, setYear] = useState(song.year_learned)
    const [notes, setNotes] = useState(song.notes)
    const [recording, setRecording] = useState(song.recording)
    const [lyrics, setLyrics] = useState(song.lyrics)
    const [singableResponse, setSingableResponse] = useState(song.singable)

    const [videoObj, setVideoObj] = useState(`https://vimeo.com/api/oembed.json?url=${song.recording}`)
    const [recordingID, setRecordingID] = useState('')
    useEffect( () => {
    
    if (song.recording)
    {fetch(videoObj).then(res => res.json()).then(data => setRecordingID(data.video_id))
    }},[videoObj] 
    )

        console.log(song)

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
    return(

        <Card style={{fontFamily:'Reem Kufi',  flexDirection: 'column', overflow: 'auto'}}> 
        <Grid item container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-center">
        <Grid item xs={12}>
            <h4>{song.title} , by {song.artist}</h4>
        </Grid>

              <Grid item xs={12}>
                    <h4>My Ability Level for this one: {song.my_ability_level}</h4>
                </Grid>

        <Grid item xs={12}>
             <h4>Year Learned: {song.year_learned}</h4>
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
        
      </Grid>
      </Card>

    )
}

export default CarouselCard