
const mongoose=require('mongoose')

const dbconnect=async ()=>{
    try {
        const conn = await mongoose.connect(process.env.dbstr)
        console.log("db connected");
    }catch(err){
        console.log(`MongoDB connection error: ${err}`)
        process.exit(1)
    }
}
module.exports=dbconnect