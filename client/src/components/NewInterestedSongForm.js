import { Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

function NewInterestedSongForm ({handleClose, currentUser,interestedSongs, setInterestedSongs}) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre] = useState('')
    const [setErrors] = useState('')
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        const songObj = {
            user_id: currentUser.id,
            title,
            artist,
            genre,


        }

        const res = await fetch('/interested_songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(songObj)
        })
        const song = await res.json()
        if (song.id) {
            history.push('/myinterestedsongs')
            setInterestedSongs([...interestedSongs, song])
        } 
        else {
            setErrors(song)
        }

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

    return(
        <div >
        
        <form onSubmit={handleSubmit}>
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

          </DialogContent>
          <DialogActions>
          <Button className="gameButton" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="gameButton" onClick={handleClose} type="submit" >
            Save
          </Button>
          
        </DialogActions>
          </form>
    </div>
    )
}

export default NewInterestedSongForm