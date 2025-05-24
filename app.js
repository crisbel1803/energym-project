require('dotenv').config();
const express = require('express');
const multer = require('multer');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const morgan = require('morgan');

const userRouter = require('./controllers/usuarios');
const disciplinaRouter = require('./controllers/disciplinas');
const instructorRouter = require('./controllers/instructores');
const salonRouter = require('./controllers/salones');
const eventoRouter = require('./controllers/eventos');
const reservaRouter = require('./controllers/reservas');

//conexion a la bd
try {
    mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('Te has conectado a MongoDB');
} catch (error) {
    console.log(error);
}

app.use(express.json());

//config de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//rnicializa Multer con la configuracion de almacenamiento definida
const upload = multer({ storage: storage });

//rutas para manejar las subidas de archivos con Multer
//ruta para subir un solo archivo
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
    console.log(req.file, req.body);
    res.status(200).json({ message: 'Archivo subido con exito!', file: req.file, body: req.body });
});

//ruta para subir multiples archivos con el mismo nombre de campo
app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    console.log(req.files, req.body);
    res.status(200).json({ message: 'Archivos subidos con exito!', files: req.files, body: req.body });
});

//middleware para subir multiples archivos con diferentes nombres de campo
const uploadMiddleware = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);

app.post('/cool-profile', uploadMiddleware, function (req, res, next) {
    console.log(req.files, req.body);
    res.status(200).json({ message: 'Archivos de perfil subidos con exito!', files: req.files, body: req.body });
});

//RUTA PARA SUBIR IMAGEN DE DISCIPLINA
app.post('/api/disciplinas/upload-image', upload.single('disciplineImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No se ha subido ningun archivo.' });
    }
    res.status(200).json({ success: true, message: 'Imagen subida con exito!', filename: req.file.filename, path: req.file.path });
});

//esto permite que las imágenes guardadas en 'public/data/uploads' sean accesibles
//a traves de rutas como '/data/uploads/nombre_de_la_imagen.jpg'
app.use(express.static(path.join(__dirname, 'public')));


//permitir solicitudes desde frontend
app.use(cors({
    origin: 'http://localhost:3000' // URL de frontend en (produccion)
}));

//configuracion de Nodemailer para el envio de correos
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//ruta para manejar el envio del formulario de contacto
app.post('/send-email', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Consulta Web de ${nombre}`,
        html: `
        <div style="font-family: 'Tilt Neon', sans-serif; background-color: #f0fdf4; padding: 2.5rem; border-radius: 0.75rem; max-width: 600px; margin: 2rem auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="font-family: 'Starzoom Shavian', sans-serif; font-size: 1.875rem; font-weight: 700; color: #16a34a; text-align: center; margin-bottom: 1.5rem;">Nuevo Mensaje de Contacto</h2>

            <div style="background-color: #ffffff; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">
                <p style="margin-bottom: 0.75rem; font-size: 1rem; color: #333333;"><strong style="color: #1a202c;">Nombre:</strong> <span style="font-weight: 400;">${nombre}</span></p>
                <p style="margin-bottom: 0.75rem; font-size: 1rem; color: #333333;"><strong style="color: #1a202c;">Correo Electronico:</strong> <span style="font-weight: 400; color: #16a34a;">${email}</span></p>
            </div>

            <div style="background-color: #ffffff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">
                <p style="margin-bottom: 0.75rem; font-size: 1rem; color: #333333;"><strong style="color: #1a202c;">Mensaje:</strong></p>
                <p style="font-size: 1rem; line-height: 1.5; color: #4a5568; white-space: pre-wrap;">${mensaje}</p>
            </div>

            <p style="font-size: 0.875rem; color: #6b7280; text-align: center; margin-top: 2rem;">Este mensaje fue enviado a traves del formulario de contacto de la página web de ENERGYM.</p>
        </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ success: false, message: 'Error al enviar el mensaje. Intentalo de nuevo más tarde.' });
        }
        console.log('Mensaje enviado: %s', info.messageId);
        res.status(200).json({ success: true, message: '¡Tu mensaje ha sido enviado con exito! Te responderemos pronto.' });
    });
});


//rutas para servir archivos estaticos del frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/registro', express.static(path.resolve('views', 'registro')));
app.use('/contacto', express.static(path.resolve('views', 'contacto')));
app.use('/reservar', express.static(path.resolve('views', 'reservar')));
app.use('/panel-usuario', express.static(path.resolve('views', 'user-panel')));
app.use('/panel-administrador', express.static(path.resolve('views', 'admin-panel')));
app.use('/bienvenida', express.static(path.resolve('views', 'bienvenida')));
app.use('/ver-clases', express.static(path.resolve('views', 'home', 'clases')));

app.use('/styles', express.static(path.resolve('views', 'css')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('views', 'img')));


//middlewares globales
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));


//rutas de backend
app.use('/api/users', userRouter);
app.use('/api/disciplinas', disciplinaRouter);
app.use('/api/instructores', instructorRouter);
app.use('/api/salones', salonRouter);
app.use('/api/eventos', eventoRouter);
app.use('/api/reservas', reservaRouter);

module.exports = app;
