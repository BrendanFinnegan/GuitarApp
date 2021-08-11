import { Card, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box';

function SongCard({song}){
    return(
  
    <Card style={{ alignItems:'center', flexDirection: 'column', height: '50vh', width: '75vw', overflow: 'auto'}}>    
            <h3>{song.title}</h3>   
            <h3>{song.artist}</h3>
            <h3>{song.genre}</h3>
            <h3>{song.lyrics}</h3>
            <h3>{song.singable}</h3>
            <h3>{song.my_ability_level}</h3>
            <h3>{song.notes}</h3>
            <h3>{song.date_learned}</h3>
            <h3>{song.recording}</h3>
    </Card>

    )
}
export default SongCard