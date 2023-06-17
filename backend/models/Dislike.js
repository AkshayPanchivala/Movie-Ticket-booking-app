const mongoose=require('mongoose');

const dislikeschema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie'
    }
});

const DisLike=new mongoose.model("DisLike",dislikeschema);
module.exports=DisLike;