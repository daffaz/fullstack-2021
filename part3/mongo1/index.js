const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Password can't be blank");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const num = process.argv[4];

const url = `mongodb+srv://baksoracing:${password}@clusterphonebook.pgyvo.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: { type: String },
  num: String
});

const Phone = mongoose.model("Phone", phoneSchema);

const phone = new Phone({
  name,
  num
});

if (process.argv.length === 3) {
  Phone.find({}).then(res => {
    res.forEach(data => {
      console.log(`${data.name} ${data.num}`);
    });
    mongoose.connection.close();
  });
} else {
  phone.save().then(res => {
    console.log("saved");
    mongoose.connection.close();
  });
}

