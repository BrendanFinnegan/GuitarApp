
function Home({currentUser}) {

    
    return(
        <>
    <h2>Home Page</h2>
    {currentUser.id ? <p>Welcome {currentUser.name} </p> : null}
        </>
    )
}

export default Home;