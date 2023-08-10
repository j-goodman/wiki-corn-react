import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const API = process.env.REACT_APP_API_URL;
  let navigate = useNavigate();

  const searchByTitle = () => {
    let title = document.getElementsByTagName("input")[0].value.toLowerCase()
    navigate(`articles/${title}`)
  }

  const randomArticle = () => {
    let allArticles = [];
    axios
      .get(`${API}/articles`)
      .then(
        (response) => {
          allArticles = response.data;
          let randomArticle = allArticles[Math.floor(Math.random() * allArticles.length)]
          navigate(`articles/${randomArticle.title}`)
        },
        (err) => console.error(err)
      )
      .catch((c) => console.warn("catch", c));
  }

  return (
    <div className="Sidebar">
      <Link to={`/`}>Homepage</Link>
      <Link to={`/articles`}>Article Index</Link>
      <Link to={`/articles/zea mays`}>Featured Article</Link>
      <Link onClick={randomArticle}>Random Article</Link>
    </div>
  );
}
  
export default Sidebar;