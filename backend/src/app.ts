import express, {NextFunction, Request, Response} from "express";
import promotionsRouter from "./modules/promotions/routes"
import {json} from "body-parser";
import connectMongoDB from "./db";
import cors from "cors";
const app = express();

app.use(json());

// CORS
app.use(cors());

// Cache-control
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

// Routers
app.use(promotionsRouter.path, promotionsRouter.router);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

connectMongoDB().then(() => {
    app.listen(3001)
});