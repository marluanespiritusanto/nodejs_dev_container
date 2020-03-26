import { FruitController_V1 } from "../../controller";

export default router => {
  router.get("/fruit", FruitController_V1.getFruits);
  router.get("/fruit/:fruitId", FruitController_V1.getFruit);
  router.post("/fruit", FruitController_V1.createFruit);
  router.patch("/fruit/:fruitId", FruitController_V1.updateFruit);
  router.delete("/fruit/:fruitId", FruitController_V1.deleteUser);
};
