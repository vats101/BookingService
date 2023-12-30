const express= require('express');
const router=express.Router();
const {create,get,update,getAll,destroy}=require('../../controller/booking-controller')

router.post('/booking',create);
router.get('/booking/:id',get);

module.exports=router;

