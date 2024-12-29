const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
    
    const ArticleSchema = new mongoose.Schema({
        title: { type: String, required: true },
        category: { type: String, required: true },
        content: { type: String, required: true },
        imageUrl: { type: String, required: true },
        metaTitle: { type: String, required: true },
        metaDescription: { type: String, required: true },
        focusKeyword: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    });
    
    const ArticleModel = mongoose.model('Article', ArticleSchema);
    
    app.post('/articles', async (req, res) => {
        try {
            const { title, category, content,metaTitle,focusKeyword,metaDescription } = req.body;
            const imageFile = req.files?.image;
    
            if (!title || !category || !content || !imageFile||!metaTitle||!focusKeyword||!metaDescription) {
                return res.status(400).json({ message: 'Missing required fields: title, category, content,meta title,meta description,focus keyword or image' });
            }
    
            const uploadResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
                folder: 'articles',
            });
    
            const newArticle = new ArticleModel({
                title,
                category,
                content,
                imageUrl: uploadResponse.secure_url,
                metaDescription,metaTitle,focusKeyword
            });
    
            await newArticle.save();
            res.status(201).json({ message: 'Article added successfully', data: newArticle });
        } catch (err) {
            console.error("Error adding article:", err);
            res.status(500).json({ message: 'Server error' });
        }
    });

    app.get('/articles', async (req, res) => {
        try {
            const articles = await ArticleModel.find().sort({ createdAt: -1 }); // Fetch all articles, sorted by creation date
            res.status(200).json({ data: articles });
        } catch (err) {
            console.error("Error fetching articles:", err);
            res.status(500).json({ message: 'Server error' });
        }
    });

    
    app.delete('/articles/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deletedArticle = await ArticleModel.findByIdAndDelete(id);
    
            if (!deletedArticle) {
                return res.status(404).json({ message: 'Article not found' });
            }
    
            res.status(200).json({ message: 'Article deleted successfully' });
        } catch (err) {
            console.error("Error deleting article:", err);
            res.status(500).json({ message: 'Server error' });
        }
    });

    const SubscriptionSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        subscribedAt: { type: Date, default: Date.now },
      });
      
      const Subscription = mongoose.model('Subscription', SubscriptionSchema);
      
      app.post('/subscribe', async (req, res) => {
        const { email } = req.body;
        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }
      
        try {
          const newSubscription = new Subscription({ email });
          await newSubscription.save();
          res.status(201).json({ message: "Subscription successful!" });
        } catch (err) {
          console.error("Error saving subscription:", err);
          res.status(500).json({ message: "Server error" });
        }
      });
      
    

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
