import express, { Express, Router } from 'express'
import { ErrorHandler } from './api/v1/routes/middlewares/error.middleware';

interface IOptions {
    port?: number,
    routes: Router
}

export class Server {
    public readonly app : Express = express() 
    private readonly port: number;
    private readonly routes: Router;

    constructor(option: IOptions) {
        const { port = 3000, routes } = option;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        // Middlewares
        this.app.use(express.json())
        
        // Use the routes
        this.app.use(this.routes)
        
        this.app.use(ErrorHandler.handle)
        
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}