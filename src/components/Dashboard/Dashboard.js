import React, { useState } from 'react';
import AddArticle from '../../AddArticle';
import './AdminDashboard.css';
import Article from '../../AllArticle';
import 'react-slideshow-image/dist/styles.css'

const AdminDashboard = () => {
    const [currentView, setCurrentView] = useState('articles'); // Manage current view (AddArticle or Articles List)

    const renderContent = () => {
        if (currentView === 'addArticle') {
            return <AddArticle />;
        }
        if (currentView === 'articles') {
            return <Article />
        }
        return null;
    };

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <button
                    className="square-button"
                    onClick={() => setCurrentView('addArticle')}
                    title="Add Article"
                >
                    +
                </button>
                <button
                    className="sidebar-button"
                    onClick={() => setCurrentView('articles')}
                >
                    Articles
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
