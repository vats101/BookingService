const express= require('express');
const app=express();
const bodyParser=require('body-parser');
const {PORT}= require('./config/serverConfig')
const db=require('./models/index');

const setupAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(PORT,async()=>{
        await db.sequelize.sync({alter:true})               // for syncing the db after changes.
        console.log('All models were synchronized successfully.');
        console.log(`Server started on ${PORT}`);
    });
}

setupAndStartServer();