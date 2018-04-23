import express from 'express'


import City from '../models/city'

class Citys  {
    constructor(){

    }
    async getCity(request,response){
        City.find({},(err,data)=>{
            if(err){
                response.status(500).json({
                    code:0,
                    message:'获取列表失败，请稍后再试',
                    data:[]
                })
                return
            }else{
                response.status(200).json({
                    code:1,
                    message:'获取列表成功',
                    data:data
                })
            }
        })
    }
    async addCity(request,response){
        let query = await request.query;
        if(query.name){
            let findOne = await City.findOne({name:query.name});
            if(findOne){
                response.status(500).json({
                    code:0,
                    message:'城市已存在',
                    data:findOne
                })
                return
            }
            City.create({name:query.name},(err,data)=>{
                if(err){
                    response.status(500).json({
                        code:0,
                        message:'添加失败',
                        data:{}
                    })
                    return
                }else{
                    response.status(200).json({
                        code:0,
                        message:'添加成功',
                        data:data
                    })
                }
            })
        }
    }
    async updCity(request,response){
        let query = await request.query;
        if(query.new_name&&query.old_name){
            City.update({name:query.old_name},{$set:{name:query.new_name}},(err,data)=>{
                if(err){
                    response.status(500).json({
                        code:0,
                        message:'修改失败，请稍后再试',
                        data:{}
                    })
                    return
                }else{
                    response.status(200).json({
                        code:1,
                        message:'修改成功',
                        data:{}
                    })
                }
            })
        }else{
            response.status(404).json({
                code:0,
                message:"请确认old_name和new_name的值存在"
            })
        }
    }
    async delCity(request,response){
        let query = request.query;
        if(query.name){
            City.remove({name:query.name},(err,data)=>{
                if(err){
                    response.status(500).json({
                        code:0,
                        message:'删除失败，请稍后再试',
                        data:{},
                    })
                    return
                }else{
                    response.status(200).json({
                        code:1,
                        message:'删除成功',
                        data:{}
                    })
                }
            })
        }
    }
}
export default new Citys()
