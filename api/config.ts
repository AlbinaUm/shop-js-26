import path from "path";
import {CorsOptions} from "cors";
import {configDotenv} from "dotenv";

const envFile = process.env['NODE_ENV'] ?
    `.${process.env['NODE_ENV']}.env` :
    '.env';

configDotenv({path: envFile});

const rootPath = __dirname;

const corsWhiteList = [
    'http://localhost:5173',
    'http://localhost:5183',
    'http://159.223.29.16:5183',
     'http://159.223.29.16',
    'http://104.248.20.243:5183'
];

const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
};

const config = {
    port: process.env.PORT || 8000,
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    corsOptions,
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        secretId: process.env.GOOGLE_SECRET_ID,
    },
    db: process.env.MONGODB_URI || 'mongodb://localhost/shop',
};


export default config;
