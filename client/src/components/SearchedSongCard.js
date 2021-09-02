import { Card } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useState } from "react";


function SearchedSongCard({song, currentUser, interestedSongs, setInterestedSongs, userSongs, setUserSongs}){
        let history = useHistory()
        const [title] = useState(song.track.track_name)
        const [artist] = useState(song.track.artist_name)
        const [genre] = useState('')
        function handleMoreInfo(){
                window.open(
                        `${song.track.track_share_url}`,
                        '_blank' 
                      );
                }
        function handleTransitionToKnown() { 
                let knownSongObj = {
                    user_id: currentUser.id,
                    title,
                    artist,
                    genre,
                    my_ability_level: 0,
                    lyrics: '',
                    year_learned: 2021,
                    notes: '',
                    singable: false,
                    recording: '',
                    tabs: ''
                            }
        
                    fetch('/songs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }, 
                        body: JSON.stringify(knownSongObj)
                        
                    })
                    .then(res => res.json())
                    .then(data => {
                        setUserSongs([...userSongs, data])
                        history.push('/mylibrary')
                    })
            }

              function handleTransitionToInterested (e) {
                e.preventDefault();
                let songObj = {
                    user_id: currentUser.id,
                    title,
                    artist,
                    genre: '',
                }

                fetch (`/interested_songs`, { 
                    method: 'POST',
                    headers: {
                'Content-Type': 'application/json'
            }, 
                body: JSON.stringify(songObj)
                }).then(res => res.json())
                .then(data => {
                    setInterestedSongs([...interestedSongs, data])
                    history.push('/myinterestedsongs')
                })

            }
    return(
  
        <Card className="songcard" style={{boxShadow: '1px 1px 4px 5px #750000', alignItems:'center', flexDirection: 'column', height: '15vh', width: '61vw', overflow: 'auto', marginTop: '15px'}}> 
        <Grid item container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start">
          <Grid item xs={6}>
                <h3>Title: {song.track.track_name}</h3>   
          </Grid>
          <Grid item xs={6}>
                <h3>Artist: {song.track.artist_name}</h3>
          </Grid>
          
          <Grid item xs={3}>
                  <Button  className="gameButton" onClick={handleMoreInfo} >Lyrics and More Information</Button>
          </Grid>
          <Grid item xs={6}>
                  <Button  className="gameButton" onClick={handleTransitionToKnown} >Add This To My Known Songs!</Button>
          </Grid>
          
          <Grid item xs={3}>
        <div>
          <Button className="gameButton" onClick={handleTransitionToInterested}>
            Add To My Interested Songs
          </Button>
        </div>
        </Grid>
          </Grid>   
        </Card>
    
        )
}
export default SearchedSongCard