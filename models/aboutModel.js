import mongoose from 'mongoose'

const aboutSchema = mongoose.Schema(
    {
    aboutTitle : {
        type : String,
        required : [true, 'Please add a title']
    },
    aboutImage : {
        type:String,
    },
    aboutDescription : {
        type : String,
    }
},
{
    timestamps : true
}
)

export default mongoose.model('About', aboutSchema)