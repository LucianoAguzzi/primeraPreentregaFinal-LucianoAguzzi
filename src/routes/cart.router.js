import { Router } from "express";
import{
    createCart,
    getCart,
    getCartById,
    addToCart,
    removeFromCart,
} from './manager/cartmanager.js';
import {getProductsById} from'../manager/product.manager.js';

const cartRoute = Router();

cartRoute.get('/', async (req, res) => {
    try {
      const carts = await getCart();
      res.status(200).json(carts);
    } catch (error) {
      res.status(404).json({ message: error.message });
      console.log(error);
    }
  });
  
  // Ruta para listar los productos de un carrito específico
  cartRoute.get('/:cartcid', async (req, res) => {
    try {
      const cartcid = req.params.cid;    
      const cart = await findCartById(cartcid);
      if (!cart) {
        res.status(404).json({ message: 'Carrito no encontrado.' });
        return;
      }else{
      res.status (200).json(cart.products);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos del carrito.' });
      console.log(error);
    }
  });
cartRoute.post('/', async (req, res) => {
    try {
      const cart = req.body;
      const newCart = await createCart(cart);
      res.json(newCart);
    } catch (error) {
      res.status(404).json({ message: error.message });
      console.log(error);
    }
  });

// Ruta para actualizar un carrito por su ID
cartRoute.post('/:cid', async (req, res) => {
    try {
        const {cartcid,pid} = req.params; 
        const selectedCart = await getCartById(cartcid);
        const selectedProduct = await getProductsById(pid);
      if (selectedCart) {
        await addToCart(selectedProduct.id, selectedCart.id);
        res.status(200).send(`product with id ${pid} was added`);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart.' });
      console.log(error);
    }
  });
  

  
  // Ruta para agregar un producto al carrito seleccionado
cartRoute.post('/:cartcid/product/:pid', async (req, res) => {
    try {
      const {cartcid,pid} = req.params; 
      const selectedCart = await getCartById(cartcid);
      const selectedProduct = await getProductsById(pid);
      if (selectedCart) {
        await addToCart(selectedCart.id, selectedProduct.id, selectedProduct);
        res.status(404).json({ message: 'Cart not found.' });
        return;
      }
      const existingProduct = cart.products.find(product => product.product === pid);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar el producto al carrito.' });
      console.log(error);
    }
  });

  cartRoute.delete('/:cartcid/products/:pid', async (req, res) => {
    try {
      const { cartcid, pid }  = req.params;
     const cart = await removeFromCart(pid);
    if (!cart) {
      res.status(404).json({ message: 'Carrito no encontrado.' });
      return;
    }
    const productIndex = cart.products.getProductsById(product => product.product === pid);
    if (productIndex === -1) {
      res.status(404).json({ message: 'Producto no encontrado en el carrito.' });
      return;
    }
    cart.products.splice(productIndex, 1);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto del carrito.' });
    console.log(error);
  }
});

  export default cartRoute;