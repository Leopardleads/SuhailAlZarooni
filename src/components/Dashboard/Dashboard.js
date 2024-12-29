import React, { useState } from 'react';
import AddArticle from '../../AddArticle';
import './AdminDashboard.css';
import Article from '../../AllArticle';
import 'react-slideshow-image/dist/styles.css'
import Users from '../../AllUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
    const [currentView, setCurrentView] = useState('articles'); // Manage current view (AddArticle or Articles List)

    const renderContent = () => {
        if (currentView === 'addArticle') {
            return <AddArticle />;
        }
        if (currentView === 'articles') {
            return <Article />
        }
        if (currentView === 'users') {
            return <Users />
        }
        return null;
    };

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <h1 className='logo'>Admin Panel</h1>
                <button
                  className={currentView==="addArticle"?" selected":"sidebar-button"}
                    onClick={() => setCurrentView('addArticle')}
                    title="Add Article"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Article
                </button>
                <button
                    className={currentView==="articles"?" selected":"sidebar-button"}
                    onClick={() => setCurrentView('articles')}
                    
                >
                   <FontAwesomeIcon icon={faBook} />
               All     Articles
                </button>
                <button
                  className={currentView==="users"?" selected":"sidebar-button"}
               
                    onClick={() => setCurrentView('users')}
                >
                     <FontAwesomeIcon icon={faUser} />
                    Users
                </button>
                <button
                    className="sidebar-button logout"
                    onClick={() => alert('Logout functionality not implemented!')}
                >
                    Logout
                </button>
            </div>
            <div className="content">{renderContent()}</div>
        </div>
    );
};

export default AdminDashboard;
