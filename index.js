const app=require("./order");
const {PORT} = process.env;
app.listen(PORT,()=>console.log(`Server is running on the ${PORT}...`))