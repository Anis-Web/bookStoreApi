//connect between express and mongodb
const mongoose = require('mongoose')

async function connectToDb(){
  //connection to DataBase
  //and this is a promise so it return error or success
  // mongoose
  // .connect(process.env.MONGO_URI)
  // .then(() => console.log('Connected to MongoDB...'))
  // .catch((error) => console.log('Connection failed to MongoDB', error))

  //the best practice
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB...')
  } catch (error) {
    console.log('Connection failed to MongoDB', error)
  }
}

module.exports = connectToDb