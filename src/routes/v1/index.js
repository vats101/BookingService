const express= require('express');
const router=express.Router();
const BookingController=require('../../controller/booking-controller')


const bookingController = new BookingController();

router.post('/bookings',bookingController.create);
router.get('/bookings/:id',bookingController.get);

// router.post('/publish',bookingController.sendMessageToQueue);


module.exports=router;

 