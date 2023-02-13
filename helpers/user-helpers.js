const db = require('../config/connection')
const collection = require('../config/collections')
const bcrypt = require('bcrypt')


module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let signupUser ={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(!user){
                const salt = await bcrypt.genSalt(10)
                userData.password = await bcrypt.hash(userData.password,salt)
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                    resolve(data)
                })
            }else{
                signupUser.isExists = true
                console.log('user already exists')
                resolve(signupUser)
            }
           
        })
       
    },
    doLogin:(userData=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false
            let response = {}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('login success')
                        response.user = user
                        response.status = true
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("failed")
                resolve({status:false})
            }
        })
    })
}