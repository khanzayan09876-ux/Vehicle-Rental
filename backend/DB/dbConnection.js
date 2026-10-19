import mongoose from "mongoose"


async function dbConnection (){
    await mongoose.connect("mongodb://localhost:27017/stc-oprater"),
    console.log("DB is connect");
    
}
export default dbConnection