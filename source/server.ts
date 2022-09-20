import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/route';
import cors from 'cors';

const router: Express = express();

const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

  
  router.use(cors(options));
/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    console.log(req.hostname);
    
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

router.options('*', cors(options));

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6969;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));