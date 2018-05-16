class Publice {
    constructor(){

    }
    returnJSON = async (response,status,code,msg,data) =>{
         await response.status(200).json({
            code : code,
            message : msg,
            data : data?data:{}
        })
    }
}

export default new Publice()
