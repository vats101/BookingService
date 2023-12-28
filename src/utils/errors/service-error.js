const  {StatusCodes}= require('http-status-codes')


class ServiceError extends Error{
    constructor(explanation){
        super();
        this.name="ServiceError";
        this.message="Server error encountered.";
        this.explanation=explanation;
        this.statusCode=
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

module.exports=ServiceError;