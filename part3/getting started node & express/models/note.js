const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((_) => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

const phoneSchema = new mongoose.Schema({
  name: String,
  num: String,
});

phoneSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Phone', phoneSchema);
