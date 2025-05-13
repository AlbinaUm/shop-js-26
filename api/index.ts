import express from "express";
import productsRouter from "./routers/products";
import cors from "cors";
import categoriesRouter from "./routers/categories";
import * as mongoose from "mongoose";
import userRouter from "./routers/users";
import config from "./config";
import adminRouter from "./routers/admin";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors(config.corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(config.port, () => {
        console.log(`Server started on port http://localhost:${config.port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(err => console.log(err));


