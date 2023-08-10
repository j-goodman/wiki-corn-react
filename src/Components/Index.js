import './Index.css';

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Index() {
  const [articles, setArticles] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/articles`)
      .then(
        (response) => {
          setArticles(response.data);
        },
        (err) => console.error(err)
      )
      .catch((c) => console.warn("catch", c));
  }, []);
  
  return (
    <div className="Index">
      <h2>All Articles</h2>
      <div className="articles-list">
          {articles.map(article => {
            return (
              <div><Link to={`/articles/${article.title}`}>{article.title}</Link> <Link className="greyout" to={`/articles/${article.title}`}>[edit]</Link></div>
            )
          })}
      </div>
    </div>
  );
  }
  
export default Index;