import { Form, Group, Label, Control, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"

function NewInterestedSongForm ({currentUser,interestedSongs, setInterestedSongs}) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [errors, setErrors] = useState('')
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        const songObj = {
            user_id: currentUser.id,
            title,
            artist,
            genre,


        }

        const res = await fetch('/interested_songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(songObj)
        })
        const song = await res.json()
        if (song.id) {
            history.push('/myinterestedsongs')
            setInterestedSongs([...interestedSongs, song])
        } 
        else {
            setErrors(song)
        }

    }

    return(
        <div >
        <h3 style={{fontFamily: 'Reem Kufi', color: 'black' }}>Add a New Song That You Want to Learn</h3>
        
        <Form onSubmit={handleSubmit} style={{fontFamily: 'Reem Kufi', color: 'black' }}>
        <div style={{fontFamily: 'Reem Kufi', color: 'black', textAlign: 'left'}}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="text" placeholder="Enter The Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicArtist">
                <Form.Label>Artist</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="text" placeholder="Enter The Artist" value={artist} onChange={(e) => setArtist(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control style={{marginLeft: '10px'}} type="text" placeholder="Enter The Genre" value={genre} onChange={(e) => setGenre(e.target.value)}/>
            </Form.Group>

            </div>
        
        
            <Button type="submit" className="gameButton">Add Song!</Button>
            
        </Form>
        
        {/* {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Reem Kufi', color: 'black' }}>{e}</p>) : null} */}
    </div>
    )
}

export default NewInterestedSongForm