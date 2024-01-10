import { Link } from "react-router-dom"

// Navbar is a function that returns template
const Navbar = () =>{
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1> Welcome from User Profile </h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar