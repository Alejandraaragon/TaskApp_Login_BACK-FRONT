import mongoose from "mongoose";


export const connectDB = async () => {
    try {
       await mongoose.connect(`mongodb://127.0.0.1:27017/my_task`);
       console.log('db is conected')
    } catch (error) {
        console.log(error)
    }
}


/* 
alelita25
ALPA4mZQjC76xMtv
 */



