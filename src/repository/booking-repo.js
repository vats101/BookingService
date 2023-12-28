const { ValidationError } = require('../utils/errors/validation-error');
const {Booking} = require('../models/index');
const {ServiceError} = require('../utils/errors/service-error')
class BookingRepo{
    async create(data){
        try{
            const booking=await Booking.create(data);
            return booking; 
        }
        catch(error){
            if(error.name=='SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new ServiceError("Due to some internal server issue unable to create booking.");
        }
    }

}

module.exports=BookingRepo;