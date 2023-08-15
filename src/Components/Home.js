import './Home.css';

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Home() {
    const [article, setArticle] = useState({});
    let navigate = useNavigate();
    const API = process.env.REACT_APP_API_URL;
    const featuredTitle = "Zea mays"

    useEffect(() => {
      axios
      .get(`${API}/articles/${featuredTitle}`)
      .then((response) => {
          setArticle(response.data);
        })
        .catch((c) => {
          console.warn("catch", c);
        });
    }, [navigate, API]);
  
    return (
      <div className="Article">
        <h2>Welcome to Wiki Corn</h2>
        <h3><b className="greyout">Featured Article:</b>&nbsp;<Link to={`/articles/${article.title}`}>{article.title}</Link></h3>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    );
  }
  
export default Home;
  