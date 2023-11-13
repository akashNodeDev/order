const mongoose = require("mongoose");

const {MONGODB_URL}=process.env;

exports.connect = () => {
    mongoose.connect(MONGODB_URL)
    .then(
        console.log("DB Connected Successfully")
    )
    .catch(error=>{
        console.log('DB connection Failed');
        console.log(error);
        proess.exit(1)
    })
}