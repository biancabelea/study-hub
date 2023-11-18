import {useNavigate} from "react-router-dom";
import {auth} from "../firebaseConfig";
import "./HomePage.css"

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('eroare la log out:', error);
        }
    };

    return (
        <>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Logout;