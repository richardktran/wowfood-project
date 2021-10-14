const order = require('../models/Order');

module.exports.viewOrder = async (req, res) => {
    try {
        const orders = await order.viewOrder();
        if(orders){
            res.status(200).json({
                data: orders
            });
        }
        else{
            res.json({
                message: "Can't not find order"
            })
        }
      
    }catch(err) {
        console.error(err);
    }
}


module.exports.findOrder = async (req, res)=>{
    try{
        const search = req.params.search;
        const orders = await order.findOrder(`%${search}%`);
        if(orders != null){
            res.status(200).json({
                data: orders
            });
        }else{
            res.status(200).json({
                data:[]
            })
        }
    }catch(err) {
        console.error(err);
    }
}

module.exports.statistical = async (req, res) => {
    try {
        const array = [];
        const year = req.params.year;
        for (let i = 1; i <= 12; i++) {
            const result = await order.statistical(year, i);
            let temp = Object.values(result);
            array.push(...temp);
            // array.push(result);

        }
        array.forEach(function(part, index) {
           if(array[index] == null){
            array[index]  = 0;
           } 
        });

        if(array.length > 0){
            res.status(200).json({
                data:array
            });
        }else{
            data: [];
        }
    }catch(err) {
        console.error(err);
    }
}