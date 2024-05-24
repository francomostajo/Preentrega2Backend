import { Router } from "express";
import userModel from "../dao/models/user.model.js";

const router = Router ();

router.get('/', async (req, res) =>{
    try {
        let users = await userModel.find()
        res.send({result: "success", payload:users})
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req, res) =>{
let {nombre,apellido,email} = req.body 
if(!nombre || !apellido || !email){
    res.send({status: "error", error:"faltan parametros"})
}
let result = await userModel.create({nombre,apellido, email})
res.send({result: "success", payload: result })
})
router.post('/login', async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).send({ status: 'error', error: 'Usuario no encontrado' });
    }

    // Aquí puedes hacer más validaciones, como verificar la contraseña
    // Si el usuario y contraseña son correctos, puedes generar un token de sesión y enviarlo como respuesta
    // Por simplicidad, aquí solo devolvemos un mensaje de éxito
    return res.send({ status: 'success', message: 'Login exitoso' });
});
router.put('/:uid', async (req, res)=>{
    let { uid } = req.params
    let userToReplace= req.body
    if(!userToReplace.nombre || !userToReplace.apellido || !userToReplace.email){
        res.send({status:"error", error: "parametros no definidos"})
    }
    let result = await userModel.updateOne({_id: uid}, userToReplace)
    res.send({result:"success", playload:result})
})
router.delete('/:uid', async (req,res)=>{
    let {uid}=req.params
    let result = await userModel.deleteOne({_id: uid, })
    res.send({result:"success", playload:result})
})


export default router;