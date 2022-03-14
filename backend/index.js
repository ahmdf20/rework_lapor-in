import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/', {
  dbName: 'lapor-in',
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('connected to database'))

const User = mongoose.model('User', {
  name: { type: String },
  email: { type: String, unique: true },
  date: { type: Date, default: Date.now }
})

app.get("/read", async (req, resp) => {

  User.find({}, (err, res) => {
    if (err) {
      resp.send(err)
    }
    resp.send(res)
  })

})

app.post("/register", async (req, resp) => {
  try {
    // console.log(req)
    const user = new User(req.body)
    let result = await user.save()
    if (result) {
      resp.send(req.body)
      console.log(result)
    } else {
      console.log("User already register")
    }

  } catch (e) {
    resp.send("Something Went Wrong")
  }
});
app.listen(5000);