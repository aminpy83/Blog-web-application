import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

let posts = [];
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}));

function dataCheck(data) {
    let flag = true;
    if (!data.user || data.user.trim() === '') {
      console.log('Enter Username');
      flag = false;
    } else if (!data.title || data.title.trim() === '') {
      console.log('Forgot to write title');
      flag = false;
    } else if (!data.content || data.content.trim() === '') {
      console.log('Missing content -.-');
      flag = false;
    } 
    return flag;
}

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/submit', (req, res) => {
 const data = req.body;
 if (!dataCheck(data)) {
    console.log("You're missing something");
    res.render('index.ejs');
 } else {
 posts.push(
    {'user':data.user, 'title': data.title, 'content':data.content});
 res.render(
    'index.ejs', {data: posts});
 console.log(posts.length, posts);
 }
})

app.listen(port, () => {
    `listening to port {port}`
})
