import { Router } from "express";
const router = Router();

import setFruitRoutesV1 from "./fruit.routes";
setFruitRoutesV1(router);

export const fruitRouterV1 = {
  baseUrl: "/api/v1",
  router
};
