import Login from "./Login";


function Home({currentUser, setCurrentUser}) {

    
    return(
        <>
    <h2>Home Page</h2>
    {currentUser.id ? 
    <>
    <p>Welcome {currentUser.name} </p>

        <h4>Carousel Placeholder</h4>

    </>
     : <Login setCurrentUser={setCurrentUser} />}
        </>
    )
}

export default Home;