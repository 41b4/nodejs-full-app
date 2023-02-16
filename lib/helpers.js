const bcrypt= require('bcrypt')
const helpers={}

helpers.encryptPassword= async (password)=>{
    console.log(password)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.decryptPassword= async(password, savedPassword)=>{
    try{
       await bcrypt.compare(password, savedPassword)
    }catch(error){
        console.log(error)
    }
    
}

module.exports=helpers