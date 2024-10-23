const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cors = require('cors')

const app = express();
const PORT = 8080;
app.use(cors());

app.use(bodyParser.json());

app.use('/', routes)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
