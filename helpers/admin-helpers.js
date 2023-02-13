const db = require('../config/connection')
const collection = require('../config/collections')
const { response } = require('express')
const objectId = require('mongodb').ObjectId

module.exports={
    viewUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userId)}).then((user)=>{
                console.log(user)
                resolve(user)
            })
        })
    },
    getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    updateUser:(userDetails,userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION)
            .updateOne({_id:objectId(userId)},{
                $set:{
                    fname:userDetails.fname,
                    sname:userDetails.sname,
                    email:userDetails.email
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}