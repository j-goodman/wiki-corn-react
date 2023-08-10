import './Article.css';

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Article() {
  const [article, setArticle] = useState({});
  let { id } = useParams();
  let navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/articles/${id}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((c) => {
        console.warn("catch", c);
        navigate("/not-found");
      });
  }, [id, navigate, API]);

  return (
    <div className="Article">
      <h2>{article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </div>
  );
}

export default Article;