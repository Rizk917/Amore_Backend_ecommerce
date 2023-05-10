import asyncHandler from "express-async-handler" 
import About from '../models/aboutModel.js'
import { v2 as cloudinary } from 'cloudinary'


// Configuration 
cloudinary.config({
  cloud_name: "didb7l6nz",
  api_key: "721724432988673",
  api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q"
});

// @ desc Get about
// @route GET/api/about
// @acess Public

const getAbout = asyncHandler( async (req,res) =>{
   try{
      const about = await About.find()
      res.status(200)
      res.json(about)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get about by id
// @route GET/about/:id
// @acess Private

const getAboutById = async (req,res) =>{
   const {id} = req.params
   const about = await About.findById(id)
   if(!about){
      res.status(400)
      res.json('About not found')
  }else{
   res.status(200).json(about)
}
}

// @ desc Set about
// @route POST/about
// @acess Private

const setAbout = asyncHandler( async (req,res) =>{
    const { aboutTitle, aboutDescription } = req.body;
    try {
      let aboutImage = req.file.path; 
      const uploadedImage = await cloudinary.uploader.upload(aboutImage); 
      const about = new About({
        aboutTitle,
        aboutImage: uploadedImage.secure_url, 
        aboutDescription,

      });
      const savedAbout = await about.save();
      res.status(201).json({
        message: "About Section created successfully",
        data: savedAbout,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "About Section creation failed",
        error,
      });
    }
  })



// @ desc Update about
// @route PUT/about/:id
// @acess Private

const updateAbout = asyncHandler(async (req,res) =>{ 

   const updatedAbout = await About.findById(req.params.id)
   if(!updatedAbout){
       res.status(400)
       res.json(`Couldn't find About`)
   }
   else{
    updatedAbout.title = req.body.title,
    updatedAbout.text = req.body.text,
    updatedAbout.image = req.file.path,
    updatedAbout.save()
       res.status(200).json(updatedAbout)
   }
   })


// @ desc Delete about
// @route Delete/about/:id
// @acess Private

const deleteAbout = asyncHandler(async (req,res) =>{
   const deletedAbout = await About.findById(req.params.id)
   if(!deletedAbout){
       res.status(400)
       res.json(`Couldn't find About`)
   }
   else{
       await deletedAbout.remove();
       res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getAbout, setAbout, updateAbout, deleteAbout,getAboutById }