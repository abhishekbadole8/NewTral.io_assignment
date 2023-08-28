const { default: mongoose } = require("mongoose");

const ConnectDb = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGOOSE_CONNECTION);
    if (connect) {
      console.log(`Connection Successfull To Database.`);
    }
  } catch (error) {
    console.log(`Error Connecting To Database:${error}`);
  }
};

module.exports = ConnectDb;
