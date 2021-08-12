import { Card, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
function SongCard({song}){
    return(
  
    <Card style={{ alignItems:'center', flexDirection: 'column', height: '50vh', width: '75vw', overflow: 'auto'}}> 
        <Grid item container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start">
            <Grid item xs={3}>
            <h4>Title: {song.title}</h4>
            </Grid>
            <Grid item xs={6}>
            <h4>Artist: {song.artist}</h4>
                </Grid>
                <Grid item xs={3}>
            <h4>Genre: {song.genre}</h4>
                </Grid>
                <Grid item xs={3}>
            <h4>Is this a singable song? {song.singable? 'Yes': 'No'}</h4>
                </Grid>
                <Grid item xs={6}>
                    
            <h4>My Ability Level for this song: {song.my_ability_level}</h4>
                </Grid>
                <Grid item xs={3}>

            <h4>Year Learned: {song.year_learned}</h4>
                </Grid>
                <Grid item xs={12}>
            <h4>Lyrics: {song.lyrics}</h4>
                </Grid>
                <Grid item xs={12}>

            <h4>Notes: {song.notes}</h4>
                </Grid>
                <Grid item xs={12}>

            <h4>Recording: {song.recording}</h4>
                </Grid>
        </Grid>   
    </Card>

    )
}
export default SongCard