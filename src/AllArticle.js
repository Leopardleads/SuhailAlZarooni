import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import "./AllArticle.css";
import { Modal } from "antd";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [filterArticle, setFitlerArticle] = useState([]);
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState('');
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
      setFitlerArticle(response.data.data);
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
  const handleCategory=(val)=>{
    const filterList=articles.filter((item)=>item.category===val)
    setCategory(val)
    console.log(val,filterList)
    // setArticles(filterList)
    setFitlerArticle(filterList)
  }
console.log(articles)

  return (
    <>

  
    <div className="article-container">
    <h1 className="page-title">All Articles</h1>
    <div className="flexContainer"> 

<div className="article-form-group">
    <label htmlFor="category" className="article-label">Category</label>
    <select
        className="article-select"
        id="category"
        value={category}
        onChange={(e) => handleCategory(e.target.value)}
        required
    >
        <option value="">Select Category</option>
        <option value="event">Event</option>
        <option value="foundation">Foundation</option>
        <option value="collection">Collection</option>
        <option value="museum">Museum</option>
        <option value="media">Media</option>
        <option value="guest">Guest</option>
        <option value="about">About Us</option>
        <option value="bollywood">Bollywood</option>
        <option value="hollywood">Hollywood</option>
        <option value="pakistani">Pakistani</option>
        <option value="update">Update</option>
    </select>
</div>

</div>
      <div class="Allcontainer">
      {filterArticle.map((article) => (
  <div class="card">
    <div class="card__header" onClick={()=>showModal(article.content)}>
      <img   src={article.imageUrl}
              alt={article.title} class="card__image" width="100%"/>
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
          <small>{article.createdAt.split("T")[0]}</small>
        </div>
      </div>
    </div>
  </div>))}
  {filterArticle.length===0&&
  <h1>No Article Found</h1>}
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
