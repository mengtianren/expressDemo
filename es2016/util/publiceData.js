class Publice {
    constructor(){

    }
    returnJSON =  (response,status,code,msg,data) =>{
          response.status(200).json({
            code : code,
            message : msg,
            data : data?data:{}
        })
    }
}

export default new Publice()
