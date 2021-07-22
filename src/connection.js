const mongoose = require('mongoose')

const dburl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8u8wv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Database connected successfully')
}).catch(err => {
    console.log(err)
})