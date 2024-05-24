import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import routesProduct from './routes/routesProducts.js';
import routesCart from './routes/routesCarts.js';
import routesUser from './routes/routesUsers.js';
import routesMessages from './routes/routesMessages.js';
import __dirname from './utils.js';
import routesView from './routes/routesViews.js';
import { initializeSockets } from './dao/socketManager.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));
const socketServer = new Server(httpServer);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', routesProduct);
app.use('/api/carts', routesCart);
app.use ('/api/users', routesUser);
app.use('/api/chat', routesMessages)
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/', routesView);
initializeSockets(socketServer);
mongoose.connect("mongodb+srv://francomostajo:Olivia1998*@francomostajo.nq6loge.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=francomostajo").then(()=>{console.log("conectado a la base de datos")}).catch(error=>console.error("error en la conexion", error))
export { socketServer };

