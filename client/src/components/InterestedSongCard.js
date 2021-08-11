import { Card, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box';

function InterestedSongCard({song}){
    return(
  
        <Card style={{ alignItems:'center', flexDirection: 'column', height: '20vh', width: '75vw', overflow: 'auto'}}>    
                <h3>{song.title}</h3>   
                <h3>{song.artist}</h3>
                <h3>{song.genre}</h3>
        </Card>
    
        )
}
export default InterestedSongCard