const express = require('express');
const app = express();
const port = 3001;

import bodyParser from 'body-parser';
import router from './server/routes/routes';;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1',router);

app.get('/', (req, res) => res.send('Hello Facturas!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;