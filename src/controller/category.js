const Category = require('../models/category');
const slugify = require('slugify');

function createCategories(categories, parentId = null){

    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }

    return categoryList;

};

exports.addcategory = (req, res) => {
	console.log("[+]Request to add category ")
    let categoryUrl;
    
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }

    if(req.file){
        categoryObj.categoryImage = process.env.API+'/public/'+req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error){
			console.log("[+]error:400 from add category ")
			return res.status(400).json({ error });
		} 
        if (category){
			console.log("[+]success category added")
			return res.status(201).json({ category })
		} 
    })

}
exports.getCategories = (req, res) => {
	console.log("[+]Request to getCategories");
    Category.find({})
        .exec((error, categories) => {
            if (error){
				console.log("[+]Error from getCategories");
				return res.status(400).json({ error });
			} 
            if (categories) {
                const categoryList = createCategories(categories);
                res.status(200).json({ categoryList });
            }
        });
	console.log("[+]Success fromgetCategory");
}