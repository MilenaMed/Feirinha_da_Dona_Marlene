import fruits from "../../src/data/fruits";
import { FruitInput } from "services/fruits-service";


function insertFruit(fruit: FruitInput) {
    const id = fruits.length + 1;
    fruits.push({ ...fruit, id });
}



export const fruitFactory = { insertFruit };