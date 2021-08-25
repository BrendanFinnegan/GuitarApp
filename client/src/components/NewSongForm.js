import { Form, Group, Label, Control, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

function NewSongForm ({handleClose, userSongs, setUserSongs, currentUser}) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [lyrics, setLyrics] = useState('')
    const [year, setYear] = useState('')
    const [ability, setAbility] = useState(0)
    const [notes, setNotes] = useState('')
    const [recording, setRecording] = useState('')
    const [singableResponse, setSingableResponse] = useState(false)
    const [tabs, setTabs] = useState('')
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

    // t.integer "user_id"
    // t.string "title"
    // t.string "artist"
    // t.string "genre"
    // t.string "lyrics"
    // t.datetime "date_learned"
    // t.float "my_ability_level"
    // t.boolean "singable"
    // t.string "tabs"
    // t.string "notes"
    // t.string "recording"
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
        console.log(singableResponse)


        // console.log(currentUser)

    return(
        <div >
        {/* <h3 style={{fontFamily: 'Reem Kufi', color: 'black' }}>Add New Song to Your Library</h3> */}
        

        <form onSubmit={handleSubmit}>
        <DialogContent>
          {/* <DialogContentText>
            Edit the Song information
          </DialogContentText> */}
          
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
{/* 
            <TextField className={classes.roots}
                        autoFocus
                        margin="dense"
                        id="genre"
                        label="Genre"
                        type="text"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        fullWidth
                    /> */}

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

                {/* <div>
                <label >Singable?</label>
                <label style={{marginLeft: '10px'}}>No</label>
                <input style={{marginLeft: '10px'}} type="radio" id="no" name="singable" value="false" defaultChecked={!singableResponse} onClick={() => setSingableResponse(false)}/>
                <label style={{marginLeft: '10px'}}>Yes</label>
                <input style={{marginLeft: '10px'}} type="radio" id="yes" name="singable" value="true" defaultChecked={singableResponse} onClick={() => setSingableResponse(true)}/>
                </div> */}
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


        {/* <Form onSubmit={handleSubmit} style={{fontFamily: 'Reem Kufi', color: 'black' }}>
        <div style={{fontFamily: 'Reem Kufi', color: 'black', textAlign: 'left'}}> */}
            {/* <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="text" placeholder="Enter The Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicArtist">
                <Form.Label>Artist</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="text" placeholder="Enter The Artist" value={artist} onChange={(e) => setArtist(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="text" placeholder="Enter The Genre" value={genre} onChange={(e) => setGenre(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLyrics">
                <Form.Label>Lyrics</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="text" placeholder="Enter The Lyrics" value={lyrics} onChange={(e) => setLyrics(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicYear">
                <Form.Label>Year Learned </Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="number" placeholder="Enter The Year You Learned This Song" value={yearLearned} onChange={(e) => setYearLearned(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAbility">
                <Form.Label>My Ability Level (1-10)</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="number" placeholder="Enter Your Rating For How Well You Play This Song" value={abilityLevel} onChange={(e) => setAbilityLevel(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSingable">
                <Form.Label >Singable?</Form.Label>
                <label style={{marginLeft: '10px'}}>No</label>
                <input style={{marginLeft: '10px'}} type="radio" id="no" name="singable" value="false" onClick={() => setSingableResponse(false)}/>
                <label style={{marginLeft: '10px'}}>Yes</label>
                <input style={{marginLeft: '10px'}} type="radio" id="yes" name="singable" value="true" onClick={() => setSingableResponse(true)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicAbility">
                <Form.Label>Notes</Form.Label>
                <textarea style={{marginLeft: '10px'}} rows="2" cols="25" placeholder="Enter Any Notes you have for playing this song" value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAbility">
                <Form.Label>Tabs/Chords</Form.Label>
                <textarea style={{marginLeft: '10px'}} rows="2" cols="25" placeholder="Enter Any Tabs or Chords you have for this song" value={tabs} onChange={(e) => setTabs(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAbility">
                <Form.Label>Vimeo Recording Link</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="text" value={recording} onChange={(e) => setRecording(e.target.value)}/>
                <Form.Label>Example (https://vimeo.com/1234567)</Form.Label>
            </Form.Group>
            </div>
        
        <p>(Lyrics can be added once the song is in your library)</p>
        
            <Button type="submit" className="gameButton">Add Song!</Button>
            
        </Form> */}

        
        {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Reem Kufi', color: 'black' }}>{e}</p>) : null}
    </div>
    )
}

export default NewSongForm