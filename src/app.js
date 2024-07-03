import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import routesProduct from './routes/routesProducts.js';
import routesCart from './routes/routesCarts.js';
import routesUser from './routes/routesUsers.js';
import routesMessages from './routes/routesMessages.js';
import routesView from './routes/routesViews.js';
import routesAuth from './routes/routesAuth.js'; 
import __dirname from './utils.js';
import { initializeSockets } from './dao/socketManager.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import flash from 'express-flash';
import { PORT, MONGO_URL } from './config.js'; 


const app = express();
const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const socketServer = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
}));
app.use(flash());
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', routesProduct);
app.use('/api/carts', routesCart);
app.use('/api/users', routesUser);
app.use('/api/chat', routesMessages);
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/', routesView);
app.use('/api/sessions', routesAuth); 
initializeSockets(socketServer);

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("Conectado a la base de datos") })
    .catch(error => console.error("Error en la conexion", error))

export { socketServer };