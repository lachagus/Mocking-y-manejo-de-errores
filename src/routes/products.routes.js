import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { productDataValidator } from "../validators/productData.validator.js";
import productsControllers from "../controllers/products.controllers.js";
import { generateProductsMocks } from "../mocks/product.mock.js";

const router = Router();

//Endpoint para el mock de productos. Se pone antes que todos los otros porque sino da error.
router.get("/productsmocks", async (req, res) => {
    const products = generateProductsMocks(100);

    return res.status(200).json({ status: "OK", products });
});

router.get("/", productsControllers.getAllProducts);

router.get("/:pid", productsControllers.getProductById);

//Se utiliza la estrategia de JWT para loguearse.
//Sólo pueden crear, actulizar y borrar los admin.
router.post("/", passportCall("jwt"), authorization("admin"), productDataValidator, productsControllers.createProduct);

router.put("/:pid", passportCall("jwt"), authorization("admin"), productsControllers.updateProduct);

router.delete("/:pid", passportCall("jwt"), authorization("admin"), productsControllers.deleteProduct);

export default router;