import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";

const router = Router();
const product = new ProductManager("/products.json")

//products y products por id
router.get('/', async(req, res) =>{
    try {
        const {limit} = req.query
        const products = await product.getProducts()
        
        if (limit) {
            const limitProducts = await products.splice(0, parseFloat(limit))
            res.status(200).send(limitProducts)
        } else {
            res.status(200).send(products)
        }
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }

})
router.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productManager.getProductById(Number(id));
      if (product) {
        res.status(200).json({ message: 'Producto encontrado', product });
      } else {
        res.status(400).json({ message: 'No se encontró el producto con el ID solicitado' });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
//post product
  router.post('/products', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.createProduct(product)
        const productFile = await productManager.getProduct
        res.json(newProduct);
    } catch (error) {
        res.status(404).json ({message: error.message})
    }
});
//put product
router.put('/products/:id',async(req, res) => {
    try {
        const product = req.body
        const {id} = req.params
        const productFile = await productManager.getProduct(Number(id))
        if (productFile){
            await productManager.updateProduct(product, Number(id))
            res.send ('product updated successfully')
        } else {
            res.status(404).send('Product not found')
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})
//delete product
router.delete('./products/:id', async (req, res) => {
    try {
        const id=req.params.getAllProducts()
        if (products.length > 0) {
            await productsManager.deleteProductById(Number(id))
            res.send (`product id ${id} deleted successfully`)
    } else {
        res.send (`product ${id} not found`)
    }
}catch (error) {
        res.status(404).json({message: error.message})   
     } 
})

export default router