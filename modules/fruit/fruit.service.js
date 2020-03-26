import _fruitRepository from "./fruit.model";

class FruitService {
  async getFruits() {
    return await _fruitRepository.find();
  }

  async getFruit(fruitId) {
    if (!fruitId) {
      const error = new Error();
      error.message = "fruitId param is required";
      error.statusCode = 400;
    }

    return await _fruitRepository.findById(fruitId);
  }

  async createFruit(fruit) {
    return await _fruitRepository.create(fruit);
  }

  async updateFruit(fruitId, fruit) {
    if (!fruitId) {
      const error = new Error();
      error.message = "fruitId param is required";
      error.statusCode = 400;
    }

    const updatedFruit = await _fruitRepository.findByIdAndUpdate(
      fruitId,
      fruit,
      {
        new: true
      }
    );

    if (updatedFruit) {
      const error = new Error();
      error.message = "Fruit does not exists";
      error.statusCode = 404;
    }

    return updatedFruit;
  }

  async deleteFruit(fruitId) {
    if (!fruitId) {
      const error = new Error();
      error.message = "fruitId param is required";
      error.statusCode = 400;
    }

    const deletedFruit = await _fruitRepository.findByIdAndDelete(fruitId);

    if (deletedFruit) {
      const error = new Error();
      error.message = "Fruit does not exists";
      error.statusCode = 404;
    }

    return true;
  }
}

export default new FruitService();
