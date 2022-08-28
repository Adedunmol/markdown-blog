require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Articles = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/articles', articleRouter)

app.get('/', async (req, res) => {
    const articles = await Articles.find().sort({
        createdAt: 'desc'
    })

    res.render('articles/index', { articles })
})

app.listen(5000)