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
        <Navbar  variant="dark" style={{backgroundImage:'url(https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/spanish-acoustic-guitar-dark-red-background-bigalbaloo-stock.jpg)', backgroundAttachment: 'fixed', height: '100vh', textAlign: 'left', paddingTop: '20px'}}>
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

                   {currentUser.id ? <Nav.Link style={{color: 'white', fontSize: 'large', fontFamily:'Reem Kufi', paddingLeft: '40px'}} className="color-links" href="/login"  onClick={handleLogout}>Logout</Nav.Link> : <Nav.Link style={{ paddingLeft: '40px', color: 'white', fontSize: 'large', fontFamily:'Reem Kufi'}} className="color-links" href="/login" >Login / Sign-Up</Nav.Link>} 
                    


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