import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './NewArticleForm.css';

const API = process.env.REACT_APP_API_URL;

function NewArticleForm(props) {
  let navigate = useNavigate();
  const [submitError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [article, setArticle] = useState({
    title: "",
    body: "",
  });

  const addArticle = (newArticle) => {
    axios
      .post(`${API}/articles`, newArticle)
      .then(
        (response) => {
          navigate(`/articles`);
          setError(false);
        },
        (error) => {
          console.error(error);
          setError(true);
          setErrorMessage(error);
        }
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
    addArticle(article);
  };
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

export default NewArticleForm;
