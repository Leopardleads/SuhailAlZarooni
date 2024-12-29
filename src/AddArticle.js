import React, { useState } from 'react';
import axios from 'axios';
import './AddArticle.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescripton] = useState('');
    const [focusKeyword, setFocusKeyword] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
console.log(focusKeyword,metaTitle,metaDescription,"focusKeyword")
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('content', content);
        formData.append('metaTitle', metaTitle);
        formData.append('metaDescription', metaDescription);
        formData.append('focusKeyword', focusKeyword);

        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/articles', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
            setTitle('');
            setCategory('');
            setContent('');
            setImage(null);
        } catch (error) {
            setMessage('Error adding article');
        }
    };

    return (
        <div className="article-container">
            <div className="article-card">
                <form onSubmit={handleSubmit}>
                    <div className="flexContainer">
                    <div className="article-form-group">
                        <label htmlFor="title" className="article-label">Title</label>
                        <input
                            type="text"
                            className="article-input"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter article title"
                            required
                        />
                    </div>
                    <div className="article-form-group">
                        <label htmlFor="title" className="article-label">Meta Title</label>
                        <input
                            type="text"
                            className="article-input"
                            id="metaTitle"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            placeholder="Enter Meta Title"
                            required
                        />
                    </div>
                    </div>
                    <div className="flexContainer"> 
                         <div className="article-form-group">
                        <label htmlFor="title" className="article-label">Meta Description</label>
                        <input
                            type="text"
                            className="article-input"
                            id="metaDescription"
                            value={metaDescription}
                            onChange={(e) => setMetaDescripton(e.target.value)}
                            placeholder="Enter Meta Description"
                            required
                        />
                    </div>
                    <div className="article-form-group">
                        <label htmlFor="title" className="article-label">Focus Keyword</label>
                        <input
                            type="text"
                            className="article-input"
                            id="focusKeyword"
                            value={focusKeyword}
                            onChange={(e) => setFocusKeyword(e.target.value)}
                            placeholder="Enter Focus Keyword"
                            required
                        />
                    </div>
                    </div>
                    <div className="flexContainer"> 

                    <div className="article-form-group">
                        <label htmlFor="category" className="article-label">Category</label>
                        <select
                            className="article-select"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
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
                            <option value="about">Bollywood</option>
                            <option value="about">Hollywood</option>
                            <option value="about">Pakistani</option>
                        </select>
                    </div>
                 
                    </div>
                    <div className="article-form-group">
                        <label htmlFor="content" className="article-label">Content</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, 3, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image'],
                                    ['clean'],
                                ],
                            }}
                            formats={[
                                'header',
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'list',
                                'bullet',
                                'link',
                                'image',
                            ]}
                            style={{ height: '200px', marginBottom: '20px' }}
                        />
                    </div>
                    <div className="article-form-group margin">
                        {/* <label htmlFor="image" className="article-label">Image</label> */}
                        <input
                            type="file"
                            className="article-file-input"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>
                    <div className="article-submit-wrapper">
                        <button type="submit" className="article-submit-button">Submit</button>
                    </div>
                </form>
                {message && <p className="article-message">{message}</p>}
            </div>
        </div>
    );
};

export default AddArticle;
