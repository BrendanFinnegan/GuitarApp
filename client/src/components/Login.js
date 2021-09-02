import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
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

    const useStyles = makeStyles((theme) => ({
        roots: {
          '& label.Mui-focused': {
            color: '#000000',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
          },
          '& .MuiInput-underline:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `3px solid #000000`
        },
        },  
        root: {
            width: '100%',
            border: 'none', 
            shadow: 'none', 
            transition: 'none',
            padding: '0px',
            marginBottom: '0px'
          },
          heading: {
            color: 'black',
            fontFamily: 'Reem Kufi',  
            fontWeight: 'bold', 
            border: 'none', 
            shadow: 'none',
            fontSize: 'large'
         
          },
        }));
        const classes = useStyles();
    return(
        <>

        <br/>
        <br/>

   
            <Grid container
  direction="row"
  justifyContent="flex-start">
      <Grid item xs={12}>
        <h2 style={{margin: 'auto', align: 'center', fontFamily: 'Reem Kufi', color: 'black' }}> Login </h2>
        <br/>
        </Grid>
        
        <Grid item xs={12}>
        <Form onSubmit={handleSubmit} style={{fontFamily: 'Reem Kufi', color: 'black'}}>
      
     
            <TextField className={classes.roots} style={{backgroundColor: 'white', borderRadius: '5px'}} label="Email" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors([])
                    }}/>
 
            <br/>
            
            <TextField className={classes.roots} style={{backgroundColor: 'white', borderRadius: '5px'}} label="Password" type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors([])
                    }}/>
  
           <br />
           <br/>

            <Button type="submit" className="gameButton" style={{}}>Login</Button>
            <br/>
            <Form.Label>Or</Form.Label>
            <br/>
            <Button onClick={handleClick} className="gameButton">Signup</Button>
            

        </Form>
        </Grid>
        <Grid item xs={12}>
            {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Reem Kufi', color: 'black' }}>{e}</p>): null}
            </Grid>
            </Grid>
            </>
    )
}
export default Login
