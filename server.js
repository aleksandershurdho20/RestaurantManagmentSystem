const express = require('express')
const app = express();
const connectDb = require('./database/db')
const dotenv = require("dotenv")
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const product = require('./routes/product')
const users = require('./routes/users')
const orders = require('./routes/orders')
const reviews = require('./routes/reviews')
const path = require("path");
dotenv.config()
//middlewares
app.use(cors())
app.use(morgan('dev'))
//parse incoming request to json
app.use(express.json())
app.use('/api/auth/', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', product)
app.use('/api/users', users)
app.use('/api', orders)
app.use('/api', reviews)
app.use('/uploads', express.static('uploads'))

connectDb();
const port = process.env.PORT || 5000


app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.listen(port, () => console.log(`listen port ${port}`))