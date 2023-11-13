const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema({
    order_id:{type:String,unique:true},
    item_name:{type:String,default:""},
    cost:{type:Number,default:0.0},
    order_date:{type: Date, default: null},
    delivery_date:{type: Date, default: null}

},{timestamps: true, versionKey: false });

module.exports = mongoose.model('Order',orderSchema);