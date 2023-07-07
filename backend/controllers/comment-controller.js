const asyncHandler = require("express-async-handler");
const Movie = require("../models/Movie");
const Comment = require("../models/Comment");
const AppError=require('./../arrorhandler/Apperror');
const User=require("./../models/User")
////////////////////////////////////////////////////
//create comment////////
const createcomment=asyncHandler(async(req,res,next) => {
    

            const id = req.params.id;
            const movies = await Movie.findById(id);
           
            if (!movies) {
              return next(new AppError("Movie does not exists", 404));
            }
            const user = await User.findById(req.body.user);
            if (!user) {
              return next(new AppError("User does not exists", 404));
            }
          if(!req.body.comment||typeof(req.body.comment)=='number'||req.body.comment.trim().length<=0){
            return next(new AppError("please add a comment", 404));
          }
         
            const created = await Comment.create({
                user: req.body.user,
                movie: req.params.id,
                comment: req.body.comment.trim(),
              });
              
            if (created) {
              res.status(201).json({
                msg: "Comment Added Successfully",
              });
            } 
          
    
    
})
module.exports=createcomment