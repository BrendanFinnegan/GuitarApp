import { Form, Group, Label, Control, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function NewInterestedSongForm ({handleClose, currentUser,interestedSongs, setInterestedSongs}) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [errors, setErrors] = useState('')
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

    return(
        <div >
        {/* <h3 style={{fontFamily: 'Reem Kufi', color: 'black' }}>Add a New Song That You Want to Learn</h3> */}
        
        <form onSubmit={handleSubmit}>
        <DialogContent>
          
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
          {/* <TextField
                        autoFocus
                        margin="dense"
                        id="genre"
                        label="Genre"
                        type="text"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        fullWidth
                    /> */}

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
        
        {/* {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Reem Kufi', color: 'black' }}>{e}</p>) : null} */}
    </div>
    )
}

export default NewInterestedSongForm