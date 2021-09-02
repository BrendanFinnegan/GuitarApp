import { Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';

function NewSongForm ({handleClose, userSongs, setUserSongs, currentUser}) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre] = useState('')
    const [lyrics] = useState('')
    const [year, setYear] = useState('')
    const [ability, setAbility] = useState(0)
    const [notes] = useState('')
    const [recording, setRecording] = useState('')
    const [singableResponse] = useState(false)
    const [tabs] = useState('')
    const [errors, setErrors] = useState('')
    const history = useHistory()


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

        async function handleSubmit(e) {
            e.preventDefault()
            const songObj = {
            user_id: currentUser.id,
            title,
            artist,
            genre,
            my_ability_level: ability,
            lyrics,
            year_learned: year,
            notes,
            singable: singableResponse,
            recording,
            tabs
        }

        const res = await fetch('/songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(songObj)
        })
        const song = await res.json()
        if (song.id) {
            history.push('/mylibrary')
            setUserSongs([...userSongs, song])
        } 
        else {
            setErrors(song)
        }

    }

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
                    <Button type="submit" onClick={handleClose} className="gameButton">
                        Save
                    </Button>
                    
                    </DialogActions>
        </form>

        {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Reem Kufi', color: 'black' }}>{e}</p>) : null}
    </div>
    )
}

export default NewSongForm