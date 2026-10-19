import mongoose from "mongoose";

const fleetSchema = new mongoose.Schema({
  depot: {
    type: String,
    required: true,
  },

  pickupdate: {
    type: Date,
    required: true,
  },

  returndate: {
    type: Date,
    required: true,
  },
});

const fleetModel = mongoose.model("fleet", fleetSchema);

export default fleetModel;