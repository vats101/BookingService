const BookingService = require('../services/booking-service');
const {StatusCodes}= require('http-status-codes');
const bookingService= new BookingService();
const {createChannel,subscribeMessage,publishMessage} = require('../utils/message-queue');
const {REMINDER_BINDING_KEY} = require('../config/serverConfig')

class BookingController{

    constructor(){
    }

    async sendMessageToQueue(req,res){
        console.log("asdasd")
        const channel=await createChannel();
        publishMessage(channel,REMINDER_BINDING_KEY);
        return res.status(200).json({
            message:'Successfully published the event.',
            error:{}
        })
    }

    async create(req,res){
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
    async destroy(req,res){
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
    async get(req,res){
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

    //PATCH ->  /booking/:id
    async update (req,res){
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



    async getAll(req,res){
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

}

module.exports=BookingController