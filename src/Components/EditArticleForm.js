import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './EditArticleForm.css';

const API = process.env.REACT_APP_API_URL;

function EditArticleForm(props) {
  let { id } = useParams();
  let navigate = useNavigate();
  const [submitError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [article, setArticle] = useState({
    title: "",
    body: "",
  });

  const updateArticle = (updatedArticle) => {
    axios
      .put(`${API}/articles/${id}`, updatedArticle)
      .then(
        () => {
          console.log("Navigating to:", `/articles/${updatedArticle.title}`)
          navigate(`/articles/${updatedArticle.title}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setArticle({ ...article, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setArticle({ ...article, is_favorite: !article.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateArticle(article);
  };

  useEffect(() => {
    axios
      .get(`${API}/articles/${id}`)
      .then(
        (response) => {
          setArticle(response.data);
        },
        (err) => {
          console.error(err);
          navigate(`/not-found`);
        }
      )
      .catch((c) => console.warn("catch", c));
  }, [id, API]);

  return (
    <div className="New">
      <h2>New Article</h2>
      {submitError ? <h2>There was an error : {errorMessage.Error}</h2> : null}
      <form className="new-article-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={article.title}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br />
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          type="text"
          value={article.body}
          onChange={handleTextChange}
          className="textarea"
          required
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default EditArticleForm;
