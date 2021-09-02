import { Card } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Button } from "react-bootstrap"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

function InterestedSongCard({song, currentUser, interestedSongs, setInterestedSongs, userSongs, setUserSongs}){

        const [open, setOpen] = useState(false);
        const [title, setTitle] = useState(song.title)
        const [artist, setArtist] = useState(song.artist)
        const [genre] = useState(song.genre)
        
        function searchUltGuitar(){
                window.open(
                        `https://www.ultimate-guitar.com/search.php?search_type=title&value=${song.title}`,
                        '_blank' 
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

            function handleDelete(){
              fetch (`/destroyer/${song.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .then(data => {
                let filtered = interestedSongs.filter(item => item.id !== data.id)
                setInterestedSongs(filtered)
          })}

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
  
        <Card className='songcard' style={{ alignItems:'center', boxShadow: '1px 1px 4px 5px #750000', flexDirection: 'column', height: '20vh', width: '61vw', overflow: 'auto'}}> 
        <Grid item container
     
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start">
          <Grid item xs={5}>
                <h3>Title: {song.title}</h3>   
          </Grid>
          <Grid item xs={5}>
                <h3>Artist: {song.artist}</h3>
          </Grid>

          <Grid item xs={2}>
                  <Button style={{marginTop: '15px'}} className="gameButton" onClick={handleDelete} >Delete</Button>
          </Grid>

          <Grid item xs={4} >
                  <Button  className="gameButton" onClick={searchUltGuitar} >Search Ultimate Guitar Tabs</Button>
          </Grid>

          <Grid item xs={4}>
            
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
          <Grid item xs={4}>
                  <Button  className="gameButton" onClick={handleTransition} >Add This To My Known Songs!</Button>
          </Grid>

          
        


          </Grid>   
        </Card>
    
        )
}
export default InterestedSongCard