import { ApiRoutes } from "./api/api"
import { envs } from "./config"
import { Server } from "./server"


function main() {
    const server = new Server({
        port: envs.PORT,
        routes: ApiRoutes.routes,
    })
    server.start()
}

main()