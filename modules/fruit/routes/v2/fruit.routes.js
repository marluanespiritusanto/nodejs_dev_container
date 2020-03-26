import { FruitController_V2 } from "../../controller";

export default router => {
  router.get("/fruit", FruitController_V2.getFruits);
  router.get("/fruit/:fruitId", FruitController_V2.getFruit);
  router.post("/fruit", FruitController_V2.createFruit);
  router.patch("/fruit/:fruitId", FruitController_V2.updateFruit);
  router.delete("/fruit/:fruitId", FruitController_V2.deleteUser);
};
