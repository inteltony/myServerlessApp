const express = require('express');
const app = express();

const port = process.env.PORT || 8100;
const baseUrl = `http://localhost:${port}`;


// app.get('/', (req, res) => {
//    res.status(200).send('hello world!');
// });

// Server
// app.listen(port, () => {
//    console.log(`Listening on: http://localhost:${port}`);
// });


// Friends list
class InMemoryFriends {
   constructor() {
       this.list = [];
   }

   add(name) {
       this.list.push(name);
   }

   getAll() {
       return this.list;
   }
}
const friendsList = new InMemoryFriends();


const bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.render('index', {personList: friendsList.getAll()});
});

app.post('/submit', (req, res) => {
   friendsList.add(req.body.friendName);
   res.render('person-added', { personName: req.body.friendName, personList: friendsList.getAll() });
});

module.exports = app;