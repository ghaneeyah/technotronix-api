const Product = require("../models/product")
const {validateProduct} = require("../validators")

exports.createProduct = async (req, res)=>{
    try {
       const {error} = validateProduct(req.body)
       if (error){
       res.json(error.details[0].message) 
    }
    const product = new Product({
        category: req.body.category,
        name: req.body.name,
        img: req.file.path,
        price: req.body.price,
        featured: req.body.featured,
        topSelling: req.body.topSelling
    })

    const productItem = await product.save();

    res.setHandler("Content-Type", "applicaion/json");
    res.json(productItem)
    } catch (error) {
        console.log({message: error.message});
    }
};

exports.getAllProduct = async (req, res)=> { 
    try {
        const product = await Product.find()
    res.json(product)
    } catch (error) {
        res.json({message: error.message});
    }
};

exports.getSingleProduct = async (req, res)=> { 
    try {
        const product = await Product.findById(req.params.id)
        if (!product) { 
            res.json("No Product found")
        }
        res.json (product)
    } catch (error) {
        res.json({message: error.message});
    }
};

exports.updateProduct = async (req, res)=> {
    try {
        const product = await Product.findById(req.params.id)
            if (!product) {
                res.json("The product entered is not found!!!")
            }
            const {error} = validateProduct(req.body)
            if (error) {
                res.json(error.details[0].message)
            }
        
            product.category = req.body.category,
            product.name = req.body.name,
            product.img = req.file.path,
            product.price = req.body.price,
            product.featured = req.body.featured,
            product.topSelling = req.body.topSelling
        
            product.save()
            res.json(product)
        }catch (error) {
            res.json({message: error.message});  
          }
};

exports.deleteProduct = async (req, res)=> {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            res.json("The product entered is not found!!!")
        }
        res.json(product)
    } catch (error) {
        res.json({message: error.message});  
    } 
     
};

exports.getFeaturedProduct = async (req, res)=> {
    try {
        const featured = await Product.find({featured: true}).populate('category')
        res.json(featured)
    } catch (error) {
        res.json({message: error.message});  
    }  
};

exports.getTopSellingProduct = async (req, res)=> {
    try {
        const topSelling = await Product.find({topSelling: true}).populate('category')
        res.json(topSelling)
    } catch (error) {
        res.json({message: error.message});  
    }  
}