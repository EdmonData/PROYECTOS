const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
//mongoose.connect('mongodb://localhost:27017/mevn-database')
//mongoose.connect('mongodb+srv://calcetin:edc1234@cluster0.q94unls.mongodb.net/test')
mongoose.connect('mongodb+srv://calcetin:edc1234@pruebas.g0kzx.mongodb.net/test')
    .then(_db => console.log('DB is connected'))//! para saber si se conecto a la base de datos
    .catch(err => console.error('Error connecting to MongoDB', err));//! si dio error


//? Setting
app.set('port', process.env.PORT || 3000);//! para que pueda usar el puerto que se le asigne en el servidor


//? Middleware
app.use(morgan('dev'));//! para muestre los datos de la peticion en consola
app.use(express.json());//! para que pueda usar json

//? Routes
app.use('/api/tasks', require('./routes/tasks'));//! para que pueda usar las rutas


//? Static files
app.use(express.static(__dirname + '/public'));//! damos aceso publico a la carpeta  __dirname es una variable global que contiene el directorio actual

//? Server is listening

app.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto ', app.get('port'));
});


