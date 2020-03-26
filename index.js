import { ServerConfig } from "./config";
import { ConfigService } from "./config";
import routers from "./router";
import { config } from "dotenv";

if (ConfigService.get("NODE_ENV") !== "production") {
  config();
}

async function main() {
  const port = ConfigService.get("PORT");
  const server = new ServerConfig({
    port,
    middlewares: [],
    routers
  });

  server.listen();
}

main();
