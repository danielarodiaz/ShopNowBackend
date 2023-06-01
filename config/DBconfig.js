const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Bases de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar BD");
  }
};

module.exports = {
  dbConnection,
};
