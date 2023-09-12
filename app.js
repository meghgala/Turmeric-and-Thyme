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
    {
        imgSrc: 'img/featured_item_3.jpg',
        date: '12 October',
        title: 'Suspendisse semper non',
        category: 'Category Three',
        description: 'Praesent iaculis gravida elementum. Proin fermentum neque facilisis semper pharetra. Sed vestibulum vehicula tincidunt.',
    }
];

const blog = [
    {
        title : "Octopus Fingers",
        description:"This is a completely unpretentious, down-home macaroni and cheese recipe just like my grandma and mom always made. A simple white sauce where you add cheese and a few other flavors with macaroni and a potato chip crust. This recipe makes a lot, I like to make two pans so I can take one to a pot luck and have the other one to keep in the fridge for later. It's an easy recipe to adjust down if you only want to make one pan. If you aren't cooking it right away, just keep the topping separate until you are ready to put it in the oven.",
        calories: "350",
        preptime:'20 min',
        cooktime:'30 min',
        servings:'4',
        ingredients:['1','1','1','1','1'],
        steps:['Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.','Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.','Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.','Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.Vestibulum id est eu felis vulputate hendrerit. Suspendisse dapibus turpis in dui pulvinar imperdiet. Nunc consectetur.']
    }
]


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

app.get('/recipeblog',(req,res) => {
    res.render('recipeblog',{blog})
});