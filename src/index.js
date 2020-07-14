require('dotenv').config();
const app = require('./server/app');

app.listen(process.env.POST || 3025);
