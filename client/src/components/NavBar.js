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
        <Navbar  variant="dark" style={{ height: '100vh', textAlign: 'left', paddingTop: '20px'}}>
            <Container >
                <Navbar.Brand  style={{fontFamily:'Reem Kufi', color: 'white', fontSize: 'x-large', margin: '10px', paddingLeft: '25px', textDecoration: 'none'}} href="/">My Guitar Space</Navbar.Brand>
                <Nav className="me-auto">
                <br/>
                {currentUser.id ? <> <Nav.Link style={{color: 'white', fontSize: 'large', fontFamily:'Reem Kufi', paddingLeft: '40px'}} className="color-links" href="/">Home</Nav.Link>  <br/>
                    <br/> </>: null}
                   
                   {currentUser.id ? 
                   <>
                   <Nav.Link style={{color: 'white', fontSize: 'large', fontFamily:'Reem Kufi', paddingLeft: '40px'}} className="color-links" href="/mylibrary">My Library</Nav.Link>
                   <br/>
                   <br/>
                   </> : null}
                   {currentUser.id ? 
                   <>
                    <Nav.Link style={{color: 'white', fontSize: 'large', fontFamily:'Reem Kufi', paddingLeft: '40px'}} className="color-links" href="/myinterestedsongs">My Interested Songs</Nav.Link> 
                    <br/>
                    <br/>
                    </> : null}

                    {currentUser.id ? <> <Nav.Link style={{color: 'white', fontSize: 'large', fontFamily:'Reem Kufi', paddingLeft: '40px'}} className="color-links" href="/searchpage"  >Search For New Songs</Nav.Link> <br/><br/> </> : null} 

                   {currentUser.id ? <Nav.Link style={{color: 'white', fontSize: 'large', fontFamily:'Reem Kufi', paddingLeft: '40px'}} className="color-links" href="/login"  onClick={handleLogout}>Logout</Nav.Link> : <Nav.Link style={{ paddingLeft: '50px', color: 'white', fontSize: 'large', fontFamily:'Reem Kufi'}} className="color-links" href="/login" >Login / Sign-Up</Nav.Link>} 
                    


                </Nav>
                
            </Container>
        </Navbar>
        
    </>
    )
}
export default NavBar
