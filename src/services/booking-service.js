const BookingRepo= require('../repository/booking-repo')
const axios=require('axios');
const ServiceError = require('../utils/errors/service-error');
const {createChannel,publishMessage}=require('../utils/message-queue')
const {REMINDER_BINDING_KEY}=require('../config/serverConfig')



class BookingService{

      constructor(){
         this.bookingRepo=new BookingRepo();
      }

      async sendMessageToQueue(data){
         const payload={
            data:{
               subject:'This is a Notif from queue',
               content:'Some queue will subscribe this',
               recipientEmail: data.recipientEmail,
               notificationTime: data.notificationTime
            },
         }
         console.log("I am here.")
         const channel=await createChannel();
         publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
         console.log("success");
      }

   async create(data){
      try{
            const flightId = data.flightId;
            const response = await axios.default.get(`http://localhost:3000/flightservice/api/v1/flight/${flightId}`);
            const flightData = response.data.data;
            if(data.numberOfSeats > flightData.totalSeats){
               throw new ServiceError("Insufficient number of seats.");
            }
            let totalCost=flightData.price*data.numberOfSeats;
            const bookingPayload={...data,totalCost};  //obj destructuring to add properties.
            const booking=this.bookingRepo.create(bookingPayload);
            console.log("done")
            await axios.default.patch(`http://localhost:3000/api/v1/flight/${flightId}`,{totalSeats:flightData.totalSeats-data.numberOfSeats});
            const data1={
               recipientEmail:data.recipientEmail,
               notificationTime:new Date()
            }
            await this.sendMessageToQueue(data1);
            const updatedBooking=await this.bookingRepo.update(booking.id,{status:'Booked'});
            return updatedBooking;
      }
      catch(error){
            if(error.name=="RepositoryError" || error.name=="ValidationError"){
               throw error;
            }
            throw new ServiceError();
      }
   }

}
module.exports=BookingService;