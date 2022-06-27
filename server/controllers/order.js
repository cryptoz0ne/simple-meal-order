const Order = require("../models/Order");

exports.index = async (req, res) => {
    const orders = await Order.find({});

    res.send(orders);
}

exports.create = async (req, res) => {
    const { description } = req.body;

    const order_status = Math.floor(Math.random() * 100);
    let res_status = 200;

    let orderData = {
        description: description
    }

    if (order_status < 50)
        orderData.status = 'ORDER_COOKING';
    else if (order_status < 75)
        orderData.status = 'ORDER_READY';
    else {
        orderData.error = 'CHEF_BURNED_MEAL';
        res_status = 500;
    }
        

    const order = new Order(orderData);
    const createdOrder = await order.save();

    res.status(res_status).send(createdOrder);
}