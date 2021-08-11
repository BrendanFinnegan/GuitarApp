import Grid from '@material-ui/core/Grid'
import SongCard from './SongCard'
import Box from '@material-ui/core/Box';


function MyLibrary({userSongs}){
console.log(userSongs)
    let songCards = userSongs.map(song => {
        return <Grid item key={song.id}>
            
            <SongCard song={song} />

                </Grid>
    })
    
    return(
    <>
    <h2>MyLibrary</h2>
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