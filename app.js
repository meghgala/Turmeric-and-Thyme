const express = require("express");
const app = express();
app.set('view engine','ejs')
app.listen(3000)
app.use(express.static('public'))


const recipesData = [
    {
        imgSrc: 'img/featured_item_1.jpg',
        date: '28 August',
        title: 'Lorem ipsum dolor',
        category: 'Category One',
        description: 'Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.',
    },
    {
        imgSrc: 'img/featured_item_2.jpg',
        date: '20 September',
        title: 'Nullam nibh lacus',
        category: 'Category Two',
        description: 'Mauris sit amet quam congue, pulvinar urna et, congue diam. Suspendisse eu lorem massa. Integer sit amet posuere.',
    },
    {
        imgSrc: 'img/featured_item_3.jpg',
        date: '12 October',
        title: 'Suspendisse semper non',
        category: 'Category Three',
        description: 'Praesent iaculis gravida elementum. Proin fermentum neque facilisis semper pharetra. Sed vestibulum vehicula tincidunt.',
    },
    {
        imgSrc: 'img/featured_item_3.jpg',
        date: '12 October',
        title: 'Suspendisse semper non',
        category: 'Category Three',
        description: 'Praesent iaculis gravida elementum. Proin fermentum neque facilisis semper pharetra. Sed vestibulum vehicula tincidunt.',
    },
];


app.get('/index',(req,res) => {
    res.render('index')
});

app.get('/login',(req,res) => {
    res.render('login')
});

app.get('/inputrecipe',(req,res) => {
    res.render('inputrecipe')
});

app.get('/viewrecipe',(req,res) => {
    res.render('viewrecipe',{ recipesData })
});