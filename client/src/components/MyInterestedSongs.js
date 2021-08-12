import Grid from '@material-ui/core/Grid'
import InterestedSongCard from './InterestedSongCard'
import Box from '@material-ui/core/Box';
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

function MyInterestedSongs({interestedSongs, currentUser, setInterestedSongs, userSongs, setUserSongs}){
    let history = useHistory()
    let interestedSongCards = interestedSongs.map(song => {
        return <Grid item key={song.id}>
            
            <InterestedSongCard  userSongs={userSongs} setUserSongs={setUserSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser} song={song} />

                </Grid>
    })
    function handleNavigation() {
        history.push('/newinterestedsongform')
    }
    return(
    <>
    <h2>My Interested Songs</h2>
    <Button className="gameButton" onClick={handleNavigation}>Add New Song To Library</Button>
    <Grid container
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-end">
    {interestedSongCards}
    </Grid>
    </>
    )
}
export default MyInterestedSongs