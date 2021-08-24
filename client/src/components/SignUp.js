import { Form, Group, Label, Control, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';

function SignUp({setCurrentUser}){
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        const userObj = {
            name,
            email,
            password
        }

        const res = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userObj)
        })
        const user = await res.json()
        if (user.id) {
            setCurrentUser(user)
            history.push('/')
        } else {
            setErrors(user)
        }

    }

    function backToLogin() {
        history.push('/login')
    }

    return(
        < >

        <br/>
        <br/>
        <Grid container
  direction="row"
  justifyContent="flex-start">
      <Grid item xs={10}>
        <h2 style={{margin: 'auto', align: 'center', fontFamily: 'Reem Kufi', color: 'black' }}>Signup</h2>
        
        <Form onSubmit={handleSubmit} style={{fontFamily: 'Reem Kufi', color: 'black' }}>

                <TextField style={{backgroundColor: 'white', borderRadius: '5px'}} label="Name"  value={name} onChange={(e) => setName(e.target.value)}/>
                <br/>
                <TextField style={{backgroundColor: 'white', borderRadius: '5px'}} label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br/>

                <TextField style={{backgroundColor: 'white', borderRadius: '5px'}} label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <br/>
            <br/>
            <Button type="submit" className="gameButton">Signup</Button>
            <br/>
            
        </Form>
        {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Reem Kufi', color: 'black' }}>{e}</p>) : null}
        </Grid>
        <Grid item xs={2}>
        <Button className="gameButton" onClick={backToLogin}>Back to Login</Button>
        </Grid>
        </Grid>
    </>
    )
}
export default SignUp