const BookingService = require('../services/booking-service');
const {StatusCodes}= require('http-status-codes');
const bookingService= new BookingService();

//POST -> /booking
const create = async (req,res)=>{
    try{
        const booking = await bookingService.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            data:booking,
            success:true,
            message:"Successfully created a booking.",
            error:{}
        });
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            success:false,
            message:"Not able to create booking.",
            error:error
        })
    }
}


//DELETE -> /booking/:id
const destroy = async (req,res)=>{
    try{
        const booking = await bookingService.delete(req.params.id);
        return res.status(StatusCodes.ACCEPTED).json({
            data: booking,
            success: true,
            message:" Successfull deleted the booking. ",
            error:{}
        })
    }
    catch(error){
        return res.status(tatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            success:false,
            message:"Not able to delete booking",
            error:error
        })
    }
}


//GET ->  /booking/:id
const get = async(req,res)=>{
    try{
        const booking = await bookingService.get(req.params.id);
        // console.log(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: booking,
            success: true,
            message:" Successfull retreived the booking. ",
            error:{}
        })
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            success:false,
            message:"Not able to retreive booking",
            error:error
        })
    }

}

//PUT ->  /booking/:id
const update = async(req,res)=>{
    try{
        const booking = await bookingService.update(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            data: booking,
            success: true,
            message:" Successfull updated the booking. ",
            error:{}
        })
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            success:false,
            message:"Not able to update the booking",
            error:error
        })
    }
}

const getAll = async(req,res) =>{
    try{
        const bookings = await bookingService.getAll(req.query);
        return res.status(StatusCodes.OK).json({
            data: bookings,
            success: true,
            message:" Successfull retreived all the bookings. ",
            error:{}
        })
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            success:false,
            message:"Not able to retreive all bookings.",
            error:error
        })
    }
}


module.exports={create,update,destroy,get,getAll}