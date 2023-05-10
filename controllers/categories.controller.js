import Category from "../models/categories.model.js";



const getAll = async (req, res) =>{
    const allCategory = await Category .find();
    res.json({
        message:"All Category",
        status:200,
        data:allCategory,
    })
}


const createCategory  = async (req, res) =>{
        
    const {categoryName} = req.body;
    const category = new Category ({categoryName});

    try{
                const savedCategory  = await category.save();
                res.json({
                    message:"Category created successfully",
                    status:201,
                    data:savedCategory,
                })
            }
    catch (error){
                res.json({
                    message:"Category created failed",
                    status:203,
                                }) 
            }
}


const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        if (!req.body.categoryName) {
            throw new Error("Category updated failed");
        }
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body);
        res.json({
            message: "Category updated successfully",
            status: 200,
            data: updatedCategory,
        });
    } catch (error) {
        res.json({
            message: "Category updated failed",
            status: 203,
        });
    }
};


const deleteCategory = async (req, res) =>{
    const categoryId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        res.json({
            message:"Category deleted successfully",
            status:200,
            data:deletedCategory,
        })

    }





export default {getAll, createCategory, updateCategory, deleteCategory}
