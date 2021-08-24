import { Form, Group, Label, Control, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import Grid from '@material-ui/core/Grid'

function Login({setCurrentUser}){
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    let history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        const user = {
            email,
            password
        }
        const res = await fetch('/log_in', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
        })
        const userData = await res.json()
        if (userData.id) {
            setCurrentUser(userData)
            history.push('/')
        }
        else {
            setErrors(userData)
        }
    }

    function handleClick(e) {
        history.push('/signup')
    }
    return(
        <>

        <br/>
        <br/>

   
            <Grid container
  direction="row"
  justifyContent="flex-start">
      <Grid item xs={10}>
        <h2 style={{margin: 'auto', align: 'center', fontFamily: 'Reem Kufi', color: 'black' }}> Login </h2>
        <br/>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
        <Form onSubmit={handleSubmit} style={{fontFamily: 'Reem Kufi', color: 'black'}}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label style={{paddingRight: '10px'}}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors([])
                    }}/>
            </Form.Group>
            <br/>
            <Form.Group controlId="formBasicPassword">
                <Form.Label style={{paddingRight: '10px'}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors([])
                    }}/>
            </Form.Group>
           <br />

            <Button type="submit" className="gameButton" style={{}}>Login</Button>
            <Form.Label>Or</Form.Label>
            <Button onClick={handleClick} className="gameButton">Signup</Button>
            

        </Form>
        </Grid>
            {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Reem Kufi', color: 'black' }}>{e}</p>): null}
  
            </Grid>
            </>
    )
}
export default Login

{/* <Button onClick={handleClick} className="gameButton">Signup</Button> */}