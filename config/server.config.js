import express from "express";
import { DatabaseConfig } from "./db.config";
import { ConfigService } from "./config.service";

export class ServerConfig {
  constructor({ port, middlewares, routers }) {
    this.app = express();
    this.app.set("env", ConfigService.get("NODE_ENV"));
    this.app.set("port", port);
    this.registerJsonMiddleware();

    if (middlewares) {
      middlewares.forEach(mdlw => {
        this.registerMiddleware(mdlw);
      });
    }

    if (routers) {
      routers.forEach(({ baseUrl, router }) => {
        this.registerRouter(baseUrl, router);
      });
    }

    this.registerNotFoundMiddleware().registerErrorHandlingMiddleware();
  }

  get port() {
    return this.app.get("port");
  }

  set port(number) {
    this.app.set("port", number);
  }

  registerMiddleware(middleware) {
    this.app.use(middleware);
    return this;
  }

  registerRouter(baseUrl, router) {
    this.app.use(baseUrl, router);
    return this;
  }

  registerJsonMiddleware() {
    this.registerMiddleware(express.json());
    return this;
  }

  registerNotFoundMiddleware() {
    this.registerMiddleware((req, res, next) =>
      res.status(404).json({
        message: "Resource not found",
        statusCode: 404
      })
    );

    return this;
  }

  registerErrorHandlingMiddleware() {
    if (this.app.get("env") === "development") {
      this.registerMiddleware(
        ({ statusCode = 500, message, stack }, req, res, next) => {
          return res.status(statusCode).json({
            statusCode,
            message,
            stack
          });
        }
      );
    } else {
      this.registerMiddleware(
        ({ statusCode = 500, message }, req, res, next) => {
          res.status(statusCode).json({ statusCode, message });
        }
      );
    }

    return this;
  }

  async listen() {
    try {
      const dbConf = new DatabaseConfig(ConfigService.get("MONGO_URI"));
      await dbConf.connectDb();

      this.app.listen(this.port, () =>
        console.log(`Application listening on port: ${this.port}`)
      );
    } catch (error) {
      console.log(error);
      console.error(`Ups... An error ocurred: ${error.message}`);
    }
  }
}
