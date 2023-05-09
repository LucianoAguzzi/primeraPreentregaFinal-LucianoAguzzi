import fs from 'fs';
import { __dirname } from '../path.js';
import { getProductsById } from './productManager.js';
import { pid } from 'process';

const pathFile = __dirname + '/cart.json';
const productsPath = __dirname + '/products.json';


export const newId = async () => {
    try {
      const carts = await getCarts(); 
        let maxId = 0;
  
      carts.forEach(cart => {
        if (cart.id > maxId) {
          maxId = cart.id;
        }
      });
  
      return maxId + 1; 
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
export const createCart = async (cart) => {
    try{
    const newCart = { id: uuidv4(), products: [] };
    const carts = loadCartsFromFile();
    carts.push(newCart);
    saveCartsToFile(carts);
    res.json(newCart);
    }catch(e){
    res.status(500).json({ message: 'Error al crear el carrito.' });
    console.log(error);
  }
};

export const getCartById = async (cartcid) => {
    try {
      const cartId = req.params.id;
      const carts = loadCartsFromFile();
      const cart = carts.find((cart) => cartcid === cartId);
      if (!cart) {
        res.status(404).json({ message: 'Carrito no encontrado.' });
        return;
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el carrito.' });
      console.log(error);
    }
  };


  export const addToCart = async (pid, cartcid) => {
    try {
      const pathFile = 'carts.json';
      if (fs.existsSync(pathFile)) {
        const cartsData = await fs.promises.readFile(pathFile, 'utf-8');
        const carts = JSON.parse(cartsData);
        const selectedCart = carts.find((cart) => cart.id === cartcid);
        const selectedProduct = await getProductsById(pid);
        if (selectedCart) {
          if (!selectedProduct) {
            console.log('Product not found');
          } else {
            const productToAdd = selectedCart.products.find(
              (product) => product.id === selectedProduct.id
            );
            if (!productToAdd) {
              selectedCart.products.push({ id: selectedProduct.id, quantity: 1 });
            } else {
              productToAdd.quantity++;
            }
            await fs.promises.writeFile(pathFile, JSON.stringify(carts));
            console.log('Product added to cart successfully');
          }
        } else {
          console.log('Cart not found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const removeFromCart = async (cartcid) => {
    try {
      const cartId = req.params.id;
      const productId = req.params.productId;
  
      const carts = loadCartsFromFile();
      const cart = carts.find(c => cart.id === cartcid);
      if (!cart) {
        res.status(404).json({ message: 'Carrito no encontrado.' });
        return;
      }
  
      const productIndex = cart.products.findIndex(p => p.id === productId);
      if (productIndex === -1) {
        res.status(404).json({ message: 'Producto no encontrado en el carrito.' });
        return;
      }
  
      cart.products.splice(productIndex, 1);
      saveCartsToFile(carts);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto del carrito.' });
      console.log(error);
    }
  };