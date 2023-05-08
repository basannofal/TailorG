const mongoose = require("mongoose")


const url = "mongodb+srv://tailor:tailor@cluster0.mc2oyqi.mongodb.net/tailor?retryWrites=true&w=majority"

// const url = "mongodb+srv://tailorg:tailorg2022@tailorg.ww80vzf.mongodb.net/tailorg?retryWrites=true&w=majority";




mongoose.connect(url,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log(err);
})
