const Category = require('../models/Category')
exports.create = async (req, res) => {
    const { category } = req.body;
    try {
        let newCategory = new Category();
        newCategory.category = category
        newCategory = await newCategory.save()
        res.status(200).json({
            category: newCategory,

            successMessage: `${newCategory.category} was created!`
        })

    } catch (error) {
        res.status(500).json({
            errorrMessage: 'Please try again later'
        })
    }

}

exports.getAll = async (req, res) => {
    try {
        //in order to get all set it as empty object
        const categories = await Category.find({})
        res.status(200).json({
            categories
        })

    } catch (error) {
        res.status(500).json({
            errorrMessage: 'Please try again later'
        })
    }

}

exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        await Category.findByIdAndDelete(id)
        res.send('Category successfully deleted!')

    } catch (error) {
        res.status(500).send(error)
    }
}