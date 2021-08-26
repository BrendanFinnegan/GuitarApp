import Grid from '@material-ui/core/Grid'
import InterestedSongCard from './InterestedSongCard'
import Box from '@material-ui/core/Box';
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NewInterestedSongForm from './NewInterestedSongForm'

function MyInterestedSongs({interestedSongs, currentUser, setInterestedSongs, userSongs, setUserSongs}){

    const [filterInput, setFilterInput] = useState("")
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')

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
          padding: '0'
        },
        heading: {
          color: 'black',
          fontFamily: 'Reem Kufi',  
          fontWeight: 'bold', 
          border: 'none', 
          shadow: 'none',
          fontSize: 'large', 
          textDecoration: 'underline',
        },
      }));
      
        const classes = useStyles();

    let history = useHistory()
    
    function handleSearch(e) {
        setFilterInput(e.target.value)
    }
    
    let filterCards = interestedSongs.filter(song => song.title.toLowerCase().includes(filterInput.toLowerCase()) || song.artist.toLowerCase().includes(filterInput.toLocaleLowerCase()))
    let sortedCards = filterCards.sort((a,b) => {
      
      if (a.artist[0] < b.artist[0])
      return -1
    })


    let interestedSongCards = sortedCards.map(song => {
        return <Grid item key={song.id}>
                <Accordion style={{ boxShadow: "none", paddingLeft: "20px" }}  >
        <AccordionSummary className={classes.root}  >
        <Typography className={classes.heading} > {song.artist}, {song.title} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <InterestedSongCard  userSongs={userSongs} setUserSongs={setUserSongs} interestedSongs={interestedSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser} song={song} />
            </>
            </AccordionDetails>
            </Accordion>

                </Grid>
    })
    // function handleNavigation() {
    //     history.push('/newinterestedsongform')
    // }


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function handleSubmit() {

    }

    return(
    <>
    <Grid container
  direction="row"
  justifyContent="flex-start"
  alignItems="center">
      <Grid item xs={12}>
    <h2>My Interested Songs</h2>
      </Grid>

      <Grid item xs={5}></Grid>
      <Grid item xs={2} style={{paddingBottom: '25px'}}>
    <TextField   className={classes.roots} style={{backgroundColor: 'white', borderRadius: '5px'}} label="Search by Artist or Title" value={filterInput} onChange={handleSearch} />
    </Grid>
    <Grid item xs={1}></Grid>
    <Grid item xs={3}>
<Button className="gameButton" onClick={handleClickOpen}>
        Add New Interested Song
      </Button>
      </Grid>
      <Dialog 
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle  id="form-dialog-title">Add A New Song That You Want To Learn</DialogTitle>

        <NewInterestedSongForm handleClose={handleClose} interestedSongs={interestedSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser}/>
       
          </Dialog>

    </Grid>
    <Grid container
  direction="column"
  justifyContent="flex-start">
    {interestedSongCards}
    </Grid>
    </>
    )
}
export default MyInterestedSongs

// <NewInterestedSongForm interestedSongs={interestedSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser}/>