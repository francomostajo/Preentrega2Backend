import mongoose from "mongoose";
//crear la coleccion con el nombre

const userCollection = "usuarios"

const userSchema = new mongoose.Schema({
    nombre: {type: String, required:true, max: 100},
    apellido: {type: String, required:true, max: 100},
    email: {type: String, required: true, max:50 }
})


const userModel= mongoose.model(userCollection,userSchema)

export default userModel