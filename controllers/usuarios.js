//hacer el router. conecta el CONTROLLER con la BD CRUD
//router: registrar, consultar, eliminar
//POST, GET, DELETE, UPDATE
const express = require('express');
const userRouter = express.Router();
const user = require('../models/usuario')
const nodemailer = require('nodemailer');

//registrar la informacion que el usuario envia
// a traves del form

userRouter.post('/', async (request, response) => {
    try {
        const { nombre, email, password } = request.body;

        if (!nombre || !email || !password) {
            return response.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        let usuario1 = new user({ nombre, email, password });
        await usuario1.save();

        await enviarCorreo(usuario1.nombre, usuario1.email, usuario1.verificationToken);

        return response.status(200).json({ mensaje: 'Usuario registrado, verifica tu correo.' });
    } catch (error) {
        console.error('Error interno del servidor:', error); // 🔍 Agregar esto
        return response.status(500).json({ error: 'Error al registrar usuario' });
    }
});

//verificar el token de verificacion
userRouter.get('/verificar/:token', async (request, response) => {
    try {
        const usuario = await user.findOne({ verificationToken: request.params.token });

        if (!usuario) {
            return response.status(400).json({ error: 'Token inválido' });
        }

        usuario.verified = true;
        usuario.verificationToken = null;
        await usuario.save();

        //redirigir a la página de bienvenida después de verificar
        return response.redirect('/bienvenida');
    } catch (error) {
        return response.status(500).json({ error: 'Error al verificar el usuario' });
    }
});

async function enviarCorreo(nombre, email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mensaje = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verifica tu correo electrónico',
        html: `<p>¡Hola, ${nombre}!</p>
                <p>¡Bienvenido/a a la comunidad Energym! Estamos emocionados de tenerte con nosotros.</p>
                <p>Para empezar a sudar y **reservar tus clases favoritas**, solo necesitas un paso más: **verificar tu correo electrónico**.</p>
                <p>Haz clic en el siguiente enlace para activar tu cuenta y desbloquear todas las funcionalidades de Energym:</p>
                <a href="https://energym-project.onrender.com/api/users/verificar/${token}" style="display: inline-block; padding: 10px 20px; margin-top: 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Verificar mi cuenta Energym</a>
                <p style="margin-top: 20px;">Una vez verificado, podrás explorar nuestra amplia variedad de clases, horarios y comenzar tu camino hacia un tú más fuerte y saludable. ¡Te esperamos en el gym!</p>`
    };

    await transporter.sendMail(mensaje);
}

//obtener lista de usuarios para iniciar sesion
userRouter.get('/lista-users',async(request,response)=>{
    try{
        //let usuario = new user()
        const listado = await user.find()
         //console.log(listado)
        //return response
        return response.status(200).json({textOk:true,data:listado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurido un error'})
    }
})

userRouter.post('/actualizar',async (request,response)=>{
    //editar user
    const { nombre, email, telefono, password, id_user } = request.body;

    const updateFields = { nombre, email, telefono };

    if (password) {
        updateFields.password = password; 
    }

    try{    
            if(!nombre || !email || !id_user){
                return response.status(400).json({error: 'Todos los campos son obligatorios'});
            }else {
                const updatedUser = await user.findOneAndUpdate({_id:id_user}, updateFields, { new: true });
                
                if (!updatedUser) {
                    return response.status(400).json({error: 'user no encontrada'});
                }

                return response.status(200).json({mensaje:'Se ha actualizado correctamente'})
            }
    
        }catch(error){
            response.status(404).json({error:'error al editar user'})
        }
})

userRouter.post('/eliminar',async(request,res)=>{
    //eliminar user del menu de users
    const {id_user} = request.body
    console.log('ID eliminado:', id_user)

    try{
        const userEl = await user.deleteOne({_id:id_user})
        const listado = await user.find()
        return res.status(200).json({mensaje:'Se ha eliminado el user'})

    }catch(error){
        return res.status(400).json({error: 'Error al eliminar el user'})

    }
})



module.exports = userRouter