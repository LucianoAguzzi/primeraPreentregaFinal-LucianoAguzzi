import fs from 'fs';

export default class ProductManager{
    constructor(path){
        this.dirName= './src/files'
        this.fileName= this.dirName +path
        this.fs=fs
    


        app.put('/products/:id',async(req, res) => {
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
        app.delete('./products/:id', async (req, res) => {
            try {
                const id=req.params.getAllProducts()
                if (products.length > 0) {
                    await productsManager.deleteProductById(Number(id))
                    res.send ('product id ${id} not found')
            } 
        }catch (error) {
                res.status(404).json({message: error.message})   
             } 
        })
    const PORT = 8080;
    app.listen(PORT, ()=>{
        console.log(`server listening on port: ${PORT}`);
    });
}
}