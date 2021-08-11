import { Navbar, Container, Nav } from "react-bootstrap"

function NavBar(){
    return(
        <>
        <Navbar className="color-nav" variant="dark">
            <Container className="nav-container">
                <Navbar.Brand className="mr-auto" style={{fontFamily:'Reem Kufi', color: 'black', fontSize: 'larger'}} href="/">My Guitar Space</Navbar.Brand>
                <Nav className="me-auto">
                
                    <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/">Home</Nav.Link>

                   <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/mylibrary">My Library</Nav.Link> 

                    <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/myinterestedsongs">My Interested Songs</Nav.Link>

                   <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="ml-auto" href="/login" >Login</Nav.Link> 
                    
                </Nav>
            </Container>
        </Navbar>

    </>
    )
}
export default NavBar

{/* 
        {currentGamer.id? <Navbar.Brand style={{color: 'black', fontWeight: 'bold', outlineColor: 'white', fontFamily:'Reem Kufi'}}>Welcome </Navbar.Brand> : null} */}

        // : <Nav.Link style={{color: 'black', fontSize: 'large', fontWeight: 'bold', fontFamily:'Reem Kufi'}} className="color-links" href="/login">Login</Nav.Link>}