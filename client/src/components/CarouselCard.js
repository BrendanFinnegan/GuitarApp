import { Card } from '@material-ui/core'

import { useEffect, useState } from "react";



function CarouselCard({song, currentUser, setInterestedSongs, userSongs, setUserSongs}) {

        const [title, setTitle] = useState(song.title)
        const [artist, setArtist] = useState(song.artist)
        const [genre, setGenre] = useState(song.genre)

        console.log(song)
    return(

        <Card  >

            <h4>{title}</h4>
            
        </Card>
       

    )
}

export default CarouselCard