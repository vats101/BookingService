const express= require('express');
const app=express();
const bodyParser=require('body-parser');
const db=require('./models/index');
const APIRoutes= require('./routes/index');
const { PORT } = require('./config/serverConfig');



const setupAndStartServer=async()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use('/bookingservice/api',APIRoutes);
    
    app.listen(PORT,async()=>{
        // await db.sequelize.sync({alter:true})               // for syncing the db after changes.
        // console.log('All models were synchronized successfully.');
        console.log(`Server started on 3002`);  
    });

}

setupAndStartServer();