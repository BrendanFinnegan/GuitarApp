import { Form, Group, Label, Control, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import Grid from '@material-ui/core/Grid'

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
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{paddingRight: '10px'}}>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{paddingRight: '10px'}}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{paddingRight: '10px'}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
        
            <Button type="submit" className="gameButton">Signup</Button>
            
        </Form>
        {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Reem Kufi', color: 'black' }}>{e}</p>) : null}
        </Grid>
        <Grid item xs={2}></Grid>
        </Grid>
    </>
    )
}
export default SignUp