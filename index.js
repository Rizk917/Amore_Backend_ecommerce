import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import productRoute from './routes/products.routes.js';
import categoryRoute from './routes/categories.routes.js';
import userRoute from './routes/user.route.js';
import aboutRoute from "./routes/aboutRoute.js";
import bodyParser from 'body-parser';
import errorHandler from './middleware/error.middleware.js';
import cartRoutes from "./routes/cartRoutes.js"
import popularRoutes from "./routes/popularProductRoute.js"
import orderRoutes from './routes/orderRoutes.js'
import imageCarouselRoute from "./routes/imageCarousel.route.js";
import contactusRoutes from './routes/contactUS.js'
import cors from "cors";
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

dotenv.config();

const port = process.env.PORT || 5000;

await db();

const app = new express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Routes
app.get('/', (req, res) => {
  res.send('hello world');
});
app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/user', userRoute);
app.use("/about",aboutRoute)
app.use('/order', orderRoutes);
app.use('/cart', cartRoutes)
app.use("/imageCarousel", imageCarouselRoute);
app.use("/about",aboutRoute)
app.use("/popular",popularRoutes)

app.use("/contactus", contactusRoutes);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`API IS RUNNING ON PORT: ${port}`);
});
