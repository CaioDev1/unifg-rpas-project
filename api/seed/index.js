const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Comment = require('../models/Comment');
const Genre = require('../models/Genre');
const Image = require('../models/Image');
const MiniImage = require('../models/MiniImage');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Rating = require('../models/Rating');
const Report = require('../models/Report');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  const db = mongoose.connection;
  
  const seedData = async () => {
    try {
      // Clear existing data
      await Promise.all([
        Category.deleteMany({}),
        Comment.deleteMany({}),
        Genre.deleteMany({}),
        Image.deleteMany({}),
        MiniImage.deleteMany({}),
        Order.deleteMany({}),
        Product.deleteMany({}),
        Rating.deleteMany({}),
        Report.deleteMany({}),
        User.deleteMany({}),
      ]);
  
      // Seed data for Genre
      const genreSeed = [
        { name: 'Clothing', status: true },
        { name: 'Accessories', status: true },
        { name: 'Kids', status: true },
        // Add more genres as needed
      ];
      const genres = await Genre.insertMany(genreSeed);
  
      // Seed data for Category
      const categorySeed = [
        { name: 'Men\'s Clothing', genre: genres[0]._id, status: true },
        { name: 'Women\'s Clothing', genre: genres[0]._id, status: true },
        { name: 'Accessories', genre: genres[1]._id, status: true },
        // Add more categories as needed
      ];
      const categories = await Category.insertMany(categorySeed);
  
      // Seed data for Product
      const productSeed = [
        {
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpzkcvIe0RO5Mq4kUgwSSh6mfImwd5AeHpbg&usqp=CAU',
          name: 'Men\'s T-Shirt',
          color: 'Blue',
          sizes: ['S', 'M', 'L', 'XL'],
          description: 'Comfortable cotton t-shirt for men.',
          category: categories[0]._id,
          gender: 'Male',
          price: 19.99,
          status: true,
        },
        {
          imageUrl: 'https://storage.needpix.com/rsynced_images/fashion-3497410_1280.jpg',
          name: 'Women\'s Jeans',
          color: 'Black',
          sizes: ['XS', 'S', 'M', 'L'],
          description: 'Stylish black jeans for women.',
          category: categories[1]._id,
          gender: 'Female',
          price: 29.99,
          status: true,
        },
        // Add more products as needed
      ];
      const products = await Product.insertMany(productSeed);

      // Seed data for MiniImage
      const miniImageSeed = [
        { url: 'https://storage.needpix.com/rsynced_images/fashion-3497410_1280.jpg' },
        { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpzkcvIe0RO5Mq4kUgwSSh6mfImwd5AeHpbg&usqp=CAU' },
        { url: 'https://i.pinimg.com/236x/b7/d1/78/b7d178e36612516c477d0d142ab1ba7f.jpg' },
        { url: 'https://www.bringitonline.in/uploads/2/2/4/5/22456530/male-clothing-photoshoot-for-online-websites-bring-it-online_orig.jpeg' },
        // Add more mini-images as needed
      ];

      const miniImages = await MiniImage.insertMany(miniImageSeed);
  
      // // Seed data for Comment
      // const commentSeed = [
      //   { for: products[0]._id, comment: 'Great product!', author: /* Add a valid User ObjectId here */ },
      //   { for: products[1]._id, comment: 'Could be better', author: /* Add a valid User ObjectId here */ },
      //   // Add more comments as needed
      // ];
      // await Comment.insertMany(commentSeed);
  
      // Seed data for User
      const userSeed = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123', // You may want to hash the password before seeding
          address: '456 Oak Street',
          phone: '123-456-7890',
          admin: false,
          favorites: [products[0]._id],
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          password: 'password456', // You may want to hash the password before seeding
          address: '789 Pine Avenue',
          phone: '987-654-3210',
          admin: true,
          favorites: [products[1]._id],
        },
        // Add more users as needed
      ];
      await User.insertMany(userSeed);
  
      console.log('Seed data inserted successfully');
      db.close();
    } catch (error) {
      console.error('Error inserting seed data:', error);
      db.close();
    }
  };
  
  seedData();
});