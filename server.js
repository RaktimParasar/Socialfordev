import express from 'express';

//initialize app variable with express
const app = express();

app.get('/', (req, res) => res.send('API Running'));


//enviroment variable set to PORT
const PORT = process.env.PORT || 5000;

//app listen on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))