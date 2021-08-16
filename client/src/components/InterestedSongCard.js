import { Card } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useEffect, useState } from "react";


function InterestedSongCard({song, currentUser, setInterestedSongs, userSongs, setUserSongs}){
        let history = useHistory()
        const [open, setOpen] = useState(false);
        const [title, setTitle] = useState(song.title)
        const [artist, setArtist] = useState(song.artist)
        const [genre, setGenre] = useState(song.genre)
        function searchUltGuitar(){
                window.open(
                        `https://www.ultimate-guitar.com/search.php?search_type=title&value=${song.title}`,
                        '_blank' // <- This is what makes it open in a new window.
                      );
                }


        function handleTransition() { 
                let songObj = {
                    user_id: currentUser.id,
                    title: song.title,
                    artist: song.artist,
                    genre: song.genre,
                            }
        
                    fetch(`/interested_songs/${song.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => setInterestedSongs(data))
        
                    fetch('/songs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }, 
                        body: JSON.stringify(songObj)
                        
                    })
                    .then(res => res.json())
                    .then(data => {
                        setUserSongs([...userSongs, data])
                    })
            }

            const handleClickOpen = () => {
                setOpen(true);
              };
            
              const handleClose = () => {
                setOpen(false);
              };

              function handleEdit (e) {
                e.preventDefault();
                console.log(e.target.title.value)
                let songObj = {
                    title,
                    artist,
                    genre,
                }

                fetch (`/interested_songs/${song.id}`, { 
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
    return(
  
        <Card style={{ alignItems:'center', flexDirection: 'column', height: '20vh', width: '75vw', overflow: 'auto'}}> 
        <Grid item container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start">
          <Grid item xs={3}>
                <h3>Title: {song.title}</h3>   
          </Grid>
          <Grid item xs={6}>
                <h3>Artist: {song.artist}</h3>
          </Grid>
          <Grid item xs={3}>
                <h3>Genre: {song.genre}</h3>
          </Grid>
          <Grid item xs={3}>
                  <Button  className="gameButton" onClick={searchUltGuitar} >Search Ultimate Guitar Tabs</Button>
          </Grid>
          <Grid item xs={6}>
                  <Button  className="gameButton" onClick={handleTransition} >Add This To My Known Songs!</Button>
          </Grid>
          
          
          <Grid item xs={3}>
        <div>
      <Button className="gameButton" onClick={handleClickOpen}>
        Edit this Song Information
      </Button>

      <Dialog 
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle  id="form-dialog-title">Edit Song Information</DialogTitle>
        <form onSubmit={handleEdit}>
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
          <Button className="gameButton" type="submit" >
            Save
          </Button>
          
        </DialogActions>
          </form>
          </Dialog>
          </div>
          </Grid>
          </Grid>   
        </Card>
    
        )
}
export default InterestedSongCard