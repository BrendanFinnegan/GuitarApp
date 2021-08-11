import Grid from '@material-ui/core/Grid'
import InterestedSongCard from './InterestedSongCard'
import Box from '@material-ui/core/Box';

function MyInterestedSongs({interestedSongs}){
    let interestedSongCards = interestedSongs.map(song => {
        return <Grid item key={song.id}>
            
            <InterestedSongCard song={song} />

                </Grid>
    })
    
    return(
    <>
    <h2>My Interested Songs</h2>
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