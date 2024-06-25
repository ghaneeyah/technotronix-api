const Category = require("../models/category")
const {validateCategory} = require("../validators")

exports.createCategory = async (req, res)=> {
    try {
        const {error} = validateCategory(req.body)
        if (error) {
            res.json(error.details[0].message)
        }

        const category = new Category({
            name: req.body.name,
            description: req.body.description
        })
        const categoryItem = await category.save()

        res.setHandler("Content-Type", "applicaion/json");
        res.json(categoryItem)
    } catch (error) {
        res.json({message: error.message})
    }
};

exports.getAllCategory = async (req, res)=> { 
    try {
        const category = await Category.find()
    res.json(category)
    } catch (error) {
        res.json({message: error.message});
    }
};

exports.getSingleCategory = async (req, res)=> { 
    try {
        const category = await Category.findById(req.params.id)
        if (!category) { 
            res.json("No category found")
        }
        res.json (category)
    } catch (error) {
        res.json({message: error.message});
    }
};

exports.updateCategory = async (req, res)=> {
    try {
        const category = await Category.findById(req.params.id)
            if (!category) {
                res.json("The category entered is not found!!!")
            }
            const {error} = validateCategory(req.body)
            if (error) {
                res.json(error.details[0].message)
            }
        
            category.name = req.body.name,
            category.description = req.body.description
        
            const categoryItem = await category.save()
            res.json(categoryItem)
        }catch (error) {
            res.json({message: error.message});  
          }
    
};

exports.deleteCategory = async (req, res)=> {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            res.json("The category entered is not found!!!")
        }
        res.json(category)
    } catch (error) {
        res.json({message: error.message});  
    } 
     
}