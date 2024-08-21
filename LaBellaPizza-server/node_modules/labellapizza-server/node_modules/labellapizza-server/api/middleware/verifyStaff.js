const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyStaff = async (req, res, next) =>{
    const email = req.decoded.email;
    const query ={email: email};

    const user = await User.findOne(query);
    const isStaff = user?.role == 'Staff';

    if(!isStaff){
        return res.status(403).send({message: "forbidden access!"})
    }

    next();
};

module.exports = verifyStaff;