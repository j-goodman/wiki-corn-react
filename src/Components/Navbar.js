import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  const searchByTitle = () => {
    let title = document.getElementsByTagName("input")[0].value.toLowerCase()
    navigate(`articles/${title}`)
  }

  return (
    <div className="Navbar">
      <Link to={`/`}>
        <div className="nav-bar-title">Wiki Corn 🌽</div>
      </Link>
      <div><input></input></div>
      <div><a onClick={searchByTitle}>Search</a></div>
    </div>
  );
}
  
export default Navbar;