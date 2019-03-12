require('newrelic');
const express = require('express');
const app = express();
const port = 8888;
const morgan = require('morgan');
app.use(morgan('dev'));
var proxy = require('http-proxy-middleware');
var path = require('path');
app.use(express.static('client'));

// app.use('/', express.static(path.join(__dirname, '../client')));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.get('/api/basicdetails/:propertyId', (req, res) => res.redirect(`http://localhost:3333/api/basicdetails/${Number(req.params.propertyId)}`))
// app.get('/api/thumb/photos/:propertyId', (req, res) => res.redirect(`http://localhost:3333/api/thumb/photos/${Number(req.params.propertyId)}`))
// app.get('/api/full/photos/:propertyId', (req, res) => res.redirect(`http://localhost:3333/api/full/photos/${Number(req.params.propertyId)}`))

// app.post('/postdetails', (req, res) => res.redirect(307, 'http://localhost:3333/postdetails'))

// app.get('/:propertyId', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/../client/index.html'));
// });

app.use(
  ['/:id', '/api/basicdetails', '/api/thumb/photos', '/api/full/photos'],
  proxy({ target: 'http://localhost:3333', changeOrigin: true })
);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))