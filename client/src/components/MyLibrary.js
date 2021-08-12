import Grid from '@material-ui/core/Grid'
import SongCard from './SongCard'
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"

function MyLibrary({userSongs}){
    let history = useHistory()
    let songCards = userSongs.map(song => {
        return <Grid item key={song.id}>
            
            <SongCard song={song} />

                </Grid>
    })
    
function handleNewSongFormNavigation() {
    history.push('/newsongform')
}
    return(
    <>
    <h2>MyLibrary</h2>
    <Button className="gameButton" onClick={handleNewSongFormNavigation}>Add New Song To Library</Button>
    <Grid container
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-end">
    {songCards}
    </Grid>
    </>
    )
}
export default MyLibrary