import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllArticle.css';

const Article = () => {
  const [articles, setArticles] = useState([]);

  // Fetch articles from the server
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/articles');
      setArticles(response.data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Delete an article by ID
  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      alert('Article deleted successfully!');
      fetchArticles(); // Refresh articles after deletion
    } catch (error) {
      console.error("Error deleting article:", error);
      alert('Error deleting the article.');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="article-container">
      <h1 className="page-title">All Articles</h1>
      <div className="cards-container">
        {articles.map((article) => (
          <div key={article._id} className="card">
            <img src={article.imageUrl} alt={article.title} className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{article.title}</h2>
              <p className="card-category">Category: {article.category}</p>
              <div 
                className="card-text"
                dangerouslySetInnerHTML={{ __html: article.content }} 
              />
              <button 
                className="delete-button"
                onClick={() => deleteArticle(article._id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
