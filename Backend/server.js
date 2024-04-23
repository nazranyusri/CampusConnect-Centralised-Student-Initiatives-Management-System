require('dotenv').config();
const http = require('http');
const app = require('./index');

//listen on port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));