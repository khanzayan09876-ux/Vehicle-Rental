import mongoose from "mongoose";

let exploreSchema = mongoose.Schema({
    name :String,
    category :String,
    rating :Number,
     imageUrl :String,
    engine :String,
    transmission :String,
    fuelType :String,
    seats :Number,
    acceleration :Number,
    price :Number
})
let exploreModel = mongoose.model("explore",exploreSchema)
export default exploreModel;
