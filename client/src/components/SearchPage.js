
import SearchedSongCard from './SearchedSongCard'

import { useState } from "react"
import TextField from '@material-ui/core/TextField';
import { Button } from "react-bootstrap"


function SearchPage({interestedSongs, setInterestedSongs, currentUser, userSongs}) {

    const [titleSearchTerm, setTitleSearchTerm] = useState('')
    const [artistSearchTerm, setArtistSearchTerm] = useState('')
    const [resultsArray, setResultsArray] = useState([])


    let resultCards = resultsArray.map(res => {

        return <SearchedSongCard key={res.track.album_id} res={res} />
    })

    function handleSubmit(e) {
        e.preventDefault();
        console.log(titleSearchTerm)
        console.log(artistSearchTerm)
        fetch(`/search?artist=${artistSearchTerm}&title=${titleSearchTerm}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.message.body.track_list)
            setResultsArray(data.message.body.track_list)
        })

    }

    return(
        <>
        <h3>Search</h3>
        <form onSubmit={handleSubmit}>
        <TextField variant="filled" style={{backgroundColor: 'white', borderRadius: '5px'}} label="Title" value={titleSearchTerm} onChange={e => setTitleSearchTerm(e.target.value)} />
        <br/>
        <TextField variant="filled" style={{backgroundColor: 'white', borderRadius: '5px'}} label="Artist" value={artistSearchTerm} onChange={e => setArtistSearchTerm(e.target.value)} />
        <br/>
        <Button type="submit" className="gameButton">Search</Button>
        
        </form>

        {resultCards}
        </>
    )
}

export default SearchPage