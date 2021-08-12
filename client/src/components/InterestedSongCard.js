import { Card } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
function InterestedSongCard({song, currentUser, setInterestedSongs, userSongs, setUserSongs}){
        let history = useHistory()

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
          </Grid>   
        </Card>
    
        )
}
export default InterestedSongCard