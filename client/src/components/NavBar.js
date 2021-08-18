import { Navbar, Container, Nav } from "react-bootstrap"

function NavBar({currentUser, setCurrentUser}){

    async function handleLogout(e){
        const res = await fetch('/logout', {
            method: 'DELETE'
        })

        setCurrentUser([])
    }

    return(
        <>
        <Navbar className="color-nav" variant="dark" style={{height: '100vh', textAlign: 'left'}}>
            <Container className="nav-container">
                <Navbar.Brand className="color-links" style={{fontFamily:'Reem Kufi', color: 'black', fontSize: 'larger', margin: '10px'}} href="/">My Guitar Space</Navbar.Brand>
                <Nav className="me-auto">
                <br/>
                    <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/">Home</Nav.Link>
                    <br/>
                   {currentUser.id ? 
                   <>
                   <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/mylibrary">My Library</Nav.Link>
                   <br/>
                   </> : null}
                   {currentUser.id ? 
                   <>
                    <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/myinterestedsongs">My Interested Songs</Nav.Link> 
                    <br/>
                    </> : null}

                    {currentUser.id ? <> <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/searchpage"  >Search For New Songs</Nav.Link> <br/> </> : null} 

                   {currentUser.id ? <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/login"  onClick={handleLogout}>Logout</Nav.Link> : <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/login" >Login</Nav.Link>} 
                    


                </Nav>
                
            </Container>
        </Navbar>
        {/* <img src="https://www.clipartmax.com/png/middle/301-3010680_guitar-logo-vector-png-images-gallery-vertical-guitar-icons.png" /> */}
    </>
    )
}
export default NavBar

{/* 
        {currentGamer.id? <Navbar.Brand style={{color: 'black', fontWeight: 'bold', outlineColor: 'white', fontFamily:'Reem Kufi'}}>Welcome </Navbar.Brand> : null} */}

        // : <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/login">Login</Nav.Link>}