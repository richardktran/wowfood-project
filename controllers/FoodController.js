const upload = require('../helpers/upload.helper');
const food = require('../models/Food');
const category = require('../models/Category')


module.exports.viewFood = async (req, res) => {
    try {
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        let _category = req.query.category ?? "-1";
        let category = parseInt(_category);
        limit = parseInt(limit);
        offset = parseInt(offset);
        let sort = req.query.sort;
        const foods = sort === 'id' ? await food.sortById(limit, offset, category) : await food.sortByQuantity(limit, offset, category);
        if (foods) {
            res.status(200).json({
                data: foods
            });
        }
        else {
            res.json({
                message: "Can't not find food"
            })
        }

    } catch (err) {
        console.error(err);
    }
}

module.exports.findById = async (req, res) => {
    const id = req.params.id;
    try {
        const foods = await food.findById(id);
        res.status(200).json({
            data: foods,
            message: 'Find successfull'
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.findFood = async (req, res) => {
    let limit = req.query.limit ?? '100000000';
    let offset = req.query.position ?? '0';
    limit = parseInt(limit);
    offset = parseInt(offset);
    let sort = req.query.sort;
    const search = req.params.search;
    try {
        const foods = await food.findFood(`%${search}%`, limit, offset, sort);

        if (foods.length > 0) {
            res.status(200).json({
                data: foods
            });
        } else {
            res.status(200).json({
                data: []
            })
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports.findFoodID = async (req, res) => {
    const search = req.params.search;
    try {
        const foods = await food.findFoodID(`%${search}%`);

        if (foods.length > 0) {
            res.status(200).json({
                data: foods
            });
        } else {
            res.status(200).json({
                data: []
            })
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const foods = await food.delete(id);
        res.status(200).json({
            message: 'Food delete successfull'
        })
    } catch (err) {
        console.log(err);
    }
}


module.exports.create = async (req, res) => {
    try {
        let category_id = await category.findByName(req.body.category_name);
        let image_name = req.file ? req.file.filename : "";
        let data = await food.create({
            'food_name': req.body.food_name,
            'price': req.body.price,
            'description': req.body.description,
            'active': req.body.active,
            'category_id': category_id.id,
            'image_name': image_name
        });
        data = {
            ...data,
            'category_name': req.body.category_name
        }
        res.status(200).json({
            data: data,
            message: 'Food added successfull'
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }


}

module.exports.update = async (req, res) => {
    const id = req.params.id;
    let food_name = req.body.food_name;
    let price = req.body.price;
    let description = req.body.description;
    let active = req.body.active;
    let category_id = await category.findByName(req.body.category_name);

    let image_name = req.file ? req.file.filename : "";

    let newCategory = {
        food_name,
        price,
        description,
        active
    };
    if (image_name != "") {
        newCategory = {
            ...newCategory,
            image_name
        }
    }
    if (category_id != undefined) {
        newCategory = {
            ...newCategory,
            'category_id': category_id.id
        }
    }
    // console.log(newCategory);
    await food.update(newCategory, id);
    const data = await food.findById(id);
    res.status(200).json({
        data: data,
        message: 'Food update successfull'
    });

}
