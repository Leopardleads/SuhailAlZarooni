const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const ArticleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
        ref: 'Users',  // The model that the ObjectId points to
        required: true
      },
  title: {type: String, required: true},
  category: {type: String, required: true},
  content: {type: String, required: true},
  imageUrl: {type: String, required: true},
  metaTitle: {type: String, required: true},
  metaDescription: {type: String, required: true},
  focusKeyword: {type: String, required: true},
  isApproved: {type: Boolean, default:true},
  createdAt: {type: Date, default: Date.now},
});

const ArticleModel = mongoose.model("Article", ArticleSchema);

app.post("/articles", async (req, res) => {
  try {
    const {title, category, content, metaTitle, focusKeyword, metaDescription,userId} =
      req.body;
    const imageFile = req.files?.image;

    if (
      !title ||
      !category ||
      !content ||
      !imageFile ||
      !metaTitle ||
      !focusKeyword ||
      !metaDescription
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: title, category, content,meta title,meta description,focus keyword or image",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "articles",
      }
    );

    const newArticle = new ArticleModel({
      title,
      user: userId, 
      category,
      content,
      imageUrl: uploadResponse.secure_url,
      metaDescription,
      metaTitle,
      focusKeyword,
    });

    await newArticle.save();
    res
      .status(201)
      .json({message: "Article added successfully", data: newArticle});
  } catch (err) {
    console.error("Error adding article:", err);
    res.status(500).json({message: "Server error"});
  }
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await ArticleModel.find().populate('user').sort({createdAt: -1}); // Fetch all articles, sorted by creation date
    res.status(200).json({data: articles});
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({message: "Server error"});
  }
});
app.put("/articles/:id/approve", async (req, res) => {
  const {id} = req.params;

  try {
    // Find the user by ID
    const article = await ArticleModel.findById(id);
    if (!article) {
      return res.status(404).json({message: "Article not found"});
    }
    else{
    article.isApproved = true;
    }
    // Save the user
    await article.save();
    res.json({message: `Article approved successfully`});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
});
app.delete("/articles/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deletedArticle = await ArticleModel.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({message: "Article not found"});
    }

    res.status(200).json({message: "Article deleted successfully"});
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).json({message: "Server error"});
  }
});

const SubscriptionSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  subscribedAt: {type: Date, default: Date.now},
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  occuption: {
    type: String,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  profileUrl: {
    type: String,
  },
  amount: {
    type: Number,
    default: 199,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  paymentStatus: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  createdAt: {type: Date, default: Date.now},
});
const Users = mongoose.model("Users", UserSchema);
// Register Route
app.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    occuption,
    isAdmin,
    description,
    amount,
    paymentMethodId,
  } = req.body;

  const imageFile = req.files?.image;
  // Validate data (you can add more validation here)
  if (!email || !password) {
    return res.status(400).json({message: "All fields are required"});
  }

  try {
    // Check if user exists
    const userExists = await Users.findOne({email});
    if (userExists) {
      return res.status(400).json({message: "User already exists"});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const uploadResponse = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "users",
      }
    );

    // Create a payment intent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount should be in cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
    });

    // Save user to database
    const newUser = new Users({
      firstName,
      lastName,
      email,
      role,
      occuption,
      isAdmin,
      description,
      password: hashedPassword,
      profileUrl: uploadResponse.secure_url,
      amount,
      paymentStatus: paymentIntent.status,
      paymentId: paymentIntent.id,
    });
    await newUser.save();

    res.status(201).json({message: "User registered successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Server error"});
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({message: "Email and password are required"});
  }

  try {
    // Check if user exists
    const user = await Users.findOne({email});
    if (!user) {
      return res.status(400).json({message: "Invalid credentials"});
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: "Invalid credentials"});
    }

    // Create JWT token
    const token = jwt.sign(
      {userId: user._id, role: user.role},
      process.env.JWT_SECRET, // JWT Secret key (store in .env)
      {expiresIn: "1h"} // Token expiration time
    );

    res.status(200).json({message: "Login successful", token});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Server error"});
  }
});
app.get("/allUsers", async (req, res) => {
  try {
    const users = await Users.find().sort({createdAt: -1}); // Fetch all articles, sorted by creation date
    res.status(200).json({data: users});
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({message: "Server error"});
  }
});
app.put("/user/:id/activate", async (req, res) => {
  const {id} = req.params;
  const {action} = req.body; // action can be 'activate' or 'deactivate'

  try {
    // Find the user by ID
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Update user active status based on action
    if (action === "activate") {
      user.isActive = true;
    } else if (action === "deactivate") {
      user.isActive = false;
    } else {
      return res.status(400).json({message: "Invalid action"});
    }

    // Save the user
    await user.save();
    res.json({message: `User ${action}d successfully`, user});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
});
app.delete("/user/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const deletedUser = await Users.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({message: "user not found"});
      }
  
      res.status(200).json({message: "user deleted successfully"});
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({message: "Server error"});
    }
  });
  
app.post("/subscribe", async (req, res) => {
  const {email} = req.body;
  if (!email) {
    return res.status(400).json({message: "Email is required"});
  }

  try {
    const newSubscription = new Subscription({email});
    await newSubscription.save();
    res.status(201).json({message: "Subscription successful!"});
  } catch (err) {
    console.error("Error saving subscription:", err);
    res.status(500).json({message: "Server error"});
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
