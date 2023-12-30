const BookingRepo= require('../repository/booking-repo')
const axios=require('axios');
const ServiceError = require('../utils/errors/service-error');

class BookingService{
     constructor(){
        this.bookingRepo=new BookingRepo();
     }

     async create(data){
        try{
            const flightId = data.flightId;
            const response = await axios.default.get(`http://localhost:3000/api/v1/flight/${flightId}`);
            const flightData = response.data.data;
            if(data.numberOfSeats > flightData.totalSeats){
               throw new ServiceError("Insufficient number of seats.");
            }
            let totalCost=flightData.price*data.numberOfSeats;
            const bookingPayload={...data,totalCost};  //obj destructuring to add properties.
            const booking=this.bookingRepo.create(bookingPayload);
            await axios.default.patch(`http://localhost:3000/api/v1/flight/${flightId}`,{totalSeats:flightData.totalSeats-data.numberOfSeats});
            const updatedBooking=await this.bookingRepo.update(booking.id,{status:'Booked'});
            return updatedBooking;
        }
        catch(error){
            if(error.name=="RepositoryError" || error.name=="ValidationError"){
               throw error;
            }
            throw new ServiceError()
        }
     }

}
module.exports=BookingService;