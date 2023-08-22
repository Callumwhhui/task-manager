import { Link } from "react-router-dom"
import * as userService from '../utilities/users-service'

export default function NavBar({user, setUser}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
        <nav>
            <Link to="/orders"> Order History</Link> | &nbsp;
            <Link to="/orders/new">New Order</Link>
            <p>Welcome, {user.name}</p> | &nbsp;
            <Link to="" onClick={handleLogOut}>LogOut</Link>
        </nav>
    )
}