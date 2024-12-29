import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import "./AllArticle.css";
import { Modal } from "antd";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (val) => {
    setContent(val)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Fetch articles from the server
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/articles");
      setArticles(response.data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Delete an article by ID
  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      alert("Article deleted successfully!");
      fetchArticles(); // Refresh articles after deletion
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting the article.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);


  return (
    <>

  
    <div className="article-container">
    <h1 className="page-title">All Articles</h1>

      <div class="Allcontainer">
      {articles.map((article) => (
  <div class="card">
    <div class="card__header" onClick={()=>showModal(article.content)}>
      <img   src={article.imageUrl}
              alt={article.title} class="card__image" width="600"/>
    </div>
    <div class="card__body" onClick={()=>showModal(article.content)}>
      <span class="tag tag-blue">{article.category}</span>
      <h4>{article.title}</h4>
    
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!</p> */}
    </div>
    <div className="buttonAlign">
      <button
                className="delete-button"
                onClick={() => deleteArticle(article._id)}
              >
                 Delete
              </button>
              <button
                className="delete-button"
                onClick={() => deleteArticle(article._id)}
              >
                Approve
              </button>
              </div>
    <div class="card__footer">
      <div class="user">
        <img src="https://i.pravatar.cc/40?img=1" alt="user__image" class="user__image"/>
        <div class="user__info">
          <h5>Jane Doe</h5>
          <small>2h ago</small>
        </div>
      </div>
    </div>
  </div>))}
  </div>
    </div>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <div
               
                dangerouslySetInnerHTML={{__html: content}}
              />
      </Modal>
    </>
  );
};

export default Article;
