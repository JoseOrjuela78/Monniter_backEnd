import nodemailer from "nodemailer";
import path from 'path';
import { Incident } from '../../common/models/incident.model';
const hbs = require('nodemailer-express-handlebars');

export async  function notifyNewEmail(incident: Incident){

  const rutaViews = '../../../views/';

  const hbsConfig = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: path.join(__dirname, rutaViews),
        layoutsDir: path.join(__dirname, rutaViews),
        defaultLayout: ''
      },
      viewPath: path.join(__dirname, rutaViews),
      extName: '.hbs'
    };
 
  // Prueba gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:  587,
      secure: false,
      requireTLS: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      },
      logger: true
    });

    
  transporter.use('compile', hbs(hbsConfig));

  const ccValues = [];

    if (incident.assignedTo !== incident.createdBy) {
      ccValues.push(incident.createdBy);
      ccValues.push(incident.assignedTo);
    } else {
      ccValues.push(incident.createdBy);
    }
  
    const email = {
      from: 'Soporte monniter',
      to: process.env.USER,
      cc: ccValues,
      subject: 'Notificaciónes MONNITER ' + incident.company,
      template: 'newIncident',
      context: { incident }
    };

    
    
 return await transporter.sendMail(email).then(result =>{
   
       return 200

  }).catch(error => {
    
       return 400
  });
     
  };

 

