const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required :'This field is required',
        text: true,
        index: true
    },
    description:{
        type:String,
        required :'This field is required',
        text: true,
        index: true
    },
    category:{
        type:String,
        enum:['Dancing','Music','Sports','Education'],
        required :'This field is required'
    },
    image:{
        type:String,
        required :'This field is required'
    }
});

blogSchema.index({ title: 'text', description: 'text'});
//WildCard Indexing
//blogSchema.index({ "$**" : 'text' });


module.exports=mongoose.model('Blog',blogSchema);