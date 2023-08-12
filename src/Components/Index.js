import './Index.css';

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Index() {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  let navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const deleteArticle = (id) => {
    axios
      .delete(`${API}/articles/${id}`)
      .then(
        () => {navigate(0)},
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  }

  useEffect(() => {
    axios
      .get(`${API}/articles`)
      .then(
        (response) => {
          setArticles(
            sortBy === "title" ? (
              response.data.sort((a, b) => {
                let aTitle = a.title
                let bTitle = b.title
                if (["the", "a", "an"].includes(aTitle.split(" ")[0].toLowerCase())) {
                  aTitle = aTitle.split(" ").slice(1,aTitle.split(" ").length).join(" ")
                }
                if (["the", "a", "an"].includes(bTitle.split(" ")[0].toLowerCase())) {
                  bTitle = bTitle.split(" ").slice(1,bTitle.split(" ").length).join(" ")
                }
                if (aTitle >= bTitle) {
                  return 1
                } else {
                  return -1
                }
              })
            ) : (
              response.data.sort((a, b) => {
                if (a.date_created >= b.date_created) {
                  return -1
                } else {
                  return 1
                }
              })
              )
            );
          },
        (err) => console.error(err)
      )
      .catch((c) => console.warn("catch", c));
  }, [sortBy, articles]);

  const toggleSort = () => {
    setSortBy(sortBy === "date" ? "title" : "date")
  }
  
  return (
    <div className="Index">
      <h2>All Articles</h2>
      <a onClick={toggleSort}>Sort by {sortBy === "date" ? "title" : "date"}</a>
      <div className="articles-list">
          {articles.map(article => {
            return (
              <div key={article.id}><Link to={`/articles/${article.title}`}>{article.title}</Link> <Link className="greyout" to={`/articles/edit/${article.title}`}>[edit]</Link><Link className="greyout" onClick={() => { deleteArticle(article.id) }}>[delete]</Link></div>
            )
          })}
      </div>
    </div>
  );
  }
  
export default Index;