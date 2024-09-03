class ApiResponse {
    constructor(message,data,success,statusCode){
        this.message = message;
        this.data = data;
        this.success = success;
        this.statusCode = statusCode;
    }
}

export { ApiResponse }