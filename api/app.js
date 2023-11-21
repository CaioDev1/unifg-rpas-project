const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const cors = require('cors');
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const genreRoutes = require('./routes/genreRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const commentRoutes = require('./routes/commentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const imageRoutes = require('./routes/imageRoutes');
const miniImageRoutes = require('./routes/miniImageRoutes');

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

// ROUTES
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/genres', genreRoutes);
app.use('/products', productRoutes);
app.use('/ratings', ratingRoutes);
app.use('/comments', commentRoutes);
app.use('/orders', orderRoutes);
app.use('/reports', reportRoutes);
app.use('/images', imageRoutes);
app.use('/minis', miniImageRoutes);


// STRIPE CONNECTION
app.post("/create-payment-intent", async (req, res) => {
    const { price } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(price),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = app;