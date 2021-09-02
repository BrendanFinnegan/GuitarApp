import Grid from '@material-ui/core/Grid'
import SongCard from './SongCard'
import { Button } from "react-bootstrap"
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import NewSongForm from './NewSongForm'

function MyLibrary({currentUser, userSongs, setUserSongs}){
    const [filterInput, setFilterInput] = useState("")
    const [open, setOpen] = useState(false);
    const useStyles = makeStyles((theme) => ({
      roots: {
        '& label.Mui-focused': {
          color: '#8d0000',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#8d0000',
        },
        '& .MuiInput-underline:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `3px solid #8d0000`
      },
      },  
      root: {
          width: '100%',
          border: 'none', 
          shadow: 'none', 
          transition: 'none',
          padding: '0px',
          marginBottom: '0px'
        },
        heading: {
          color: 'black',
          fontFamily: 'Reem Kufi',  
          fontWeight: 'bold', 
          border: 'none', 
          shadow: 'none',
          fontSize: 'large'
       
        },
      }));
      const classes = useStyles();

      
      function handleSearch(e) {
        setFilterInput(e.target.value)
    }

            
        const handleClickOpen = () => {
          setOpen(true);
        };

        const handleClose = () => {
          setOpen(false);
        };
    
    let filterCards = userSongs.filter(song => song.title.toLowerCase().includes(filterInput.toLowerCase()) || song.artist.toLowerCase().includes(filterInput.toLocaleLowerCase()))
    let sortedCards = filterCards.sort((a,b) => {
      
      if (a.artist[0] < b.artist[0])
      return -1
    })


    let songCards = sortedCards.map(song => {
        return <Grid item key={song.id}>
                      <Accordion style={{ boxShadow: "none", paddingLeft: "20px" }}  >
                  <AccordionSummary  className={classes.root} >
                  <Typography className={classes.heading} >  {song.artist}, {song.title} </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                        <>
                          <SongCard setUserSongs={setUserSongs} userSongs={userSongs} song={song} />
                        </>
                      </AccordionDetails>
                      </Accordion>
              </Grid>
          })

    return(
    <>
      <Grid container
        direction="row"
        justifyContent="flex-start"
        alignItems="center">
      <Grid item xs={12}>
        
        <h2>My Library</h2>
      </Grid>
              <Grid item xs={5}></Grid>
            <Grid item xs={2} style={{paddingBottom: '25px'}}>
            <TextField className={classes.roots} style={{backgroundColor: 'white', borderRadius: '5px'}} label="Search by Artist or Title" value={filterInput} onChange={handleSearch} />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>

            <Button  className="gameButton" onClick={handleClickOpen}>
                Add A New Song
              </Button>
              </Grid>
              <Grid item xs={2}></Grid>
              <Dialog 
                open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle style={{fontFamily: 'Reem Kufi'}} id="form-dialog-title">New Song Details</DialogTitle>
                <NewSongForm handleClose={handleClose} userSongs={userSongs} setUserSongs={setUserSongs} currentUser={currentUser}/>
                  </Dialog>
    
    
        </Grid>
    <Grid container
        direction="column"
        justifyContent="flex-start"
    >
    {songCards}
    </Grid>
    </>
    )
}
export default MyLibrary