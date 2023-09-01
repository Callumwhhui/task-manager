import { Link } from "react-router-dom"
import * as userService from '../utilities/users-service'

export default function NavBar({user, setUser}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
        <nav>
            <Link to="/tasks"> All Tasks</Link> | &nbsp;
            <Link to="/task/new">New Task</Link> |&nbsp;
            <p>Welcome, {user.name}</p> | &nbsp;
            <Link to="" onClick={handleLogOut}>LogOut</Link>
        </nav>
    )
}