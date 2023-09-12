require("../models/database");
const Category=require("../models/Category");
const Blog=require('../models/Blog');
const Contact=require('../models/Contact');
// GET /
// Homepage

exports.homepage=async(req,res)=>{
    try{
        const limitNumber=5;
        const categories=await Category.find({}).limit(limitNumber);
        const latest=await Blog.find({}).sort({_id:-1}).limit(limitNumber);
        const music=await Blog.find({'category':'Music'}).limit(limitNumber);
        const dancing=await Blog.find({'category':'Dancing'}).limit(limitNumber);
        const sports=await Blog.find({'category':'Sports'}).limit(limitNumber);
        const education=await Blog.find({'category':'Education'}).limit(limitNumber);

        const food={latest,music,dancing,sports,education};

        res.render('index',{title:'Blog-home', categories , food } );
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }  
}

// GET /Categories
// Categories

exports.exploreCategories=async(req,res)=>{
    try{
        const limitNumber=20;
        const categories=await Category.find({}).limit(limitNumber);
        res.render('categories',{title:'Blog-Categories', categories } );
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }  
}

// GET /Categories/id
// Categories/id

exports.exploreCategoriesById=async(req,res)=>{
    try{
        let categoryId=req.params.id;
        const limitNumber=20;
        const categoryById=await Blog.find({'category': categoryId }).limit(limitNumber);
        res.render('categories',{title:'Blog-Categoriesss', categoryById } );
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }  
}

// GET /Blogs
// blogs

exports.exploreBlogs=async(req,res)=>{
    try{
        let blogId=req.params.id;
        const blogs= await Blog.findById(blogId);

        res.render('blog',{title:'Blog-Blogs', blogs } );
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }  
}


// Post /search
//Search
exports.searchBlog=async(req,res)=>{             
    try{
        let searchTerm=req.body.searchTerm;
        let blog=await Blog.find({$text: {$search: searchTerm , $diacriticSensitive: true}});
     
        res.render('search',{title : 'Blog-Search', blog});
    
     }catch(error){
         res.status(500).send({message:error.message || "Error Occured"});
     }     
     res.render('search',{title : 'Blog-Search', blog});
}

// GET /Explore-contact
// explore-contact

exports.Explorecontact=async(req,res)=>{             
    try{
        res.render('contact',{title : 'feedback'});
    
     }catch(error){
         res.status(500).send({message:error.message || "Error Occured"});
     }     
     res.render('contact',{title : 'feedback-Form'});
}

// POST/Explore-contact
// explore-contact

exports.contactInfoSubmit=async(req,res)=>{             
    try{
        const newContact = new Contact({
            name: req.body.name ,
            email: req.body.email ,
            message:req.body.message
        });

        await newContact.save();

        res.redirect('contact');
    
     }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
     }     
     
}

// GET /Explore-latest
// explore-latest

exports.exploreLatest=async(req,res)=>{
    try{
        const limitNumber= 20;
        const blog= await Blog.find({}).sort({ _id: -1}).limit(limitNumber);

        res.render('explore-latest',{title:'explore-latest', blog } );
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }  
}


// GET /Explore-Random
// explore-random

exports.exploreRandom=async(req,res)=>{
    try{
       let count= await Blog.find().countDocuments();
       let random = Math.floor(Math.random()*count);
       let blog = await Blog.findOne().skip(random).exec();
    //    res.json(blog);
       
       res.render('explore-random',{title : 'Blog-Explore Random',blog});
        
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }  
}


// GET /submit-Blog
// sumit-Blog

exports.submitBlog=async(req,res)=>{
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-blog',{title : 'submit- Blog' , infoErrorsObj , infoSubmitObj});
}


// POST /submit-Blog
// sumit-Blog

exports.submitBlogOnPost=async(req,res)=>{

    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;
    
        if(!req.files || Object.keys(req.files).length === 0){
          console.log('No Files where uploaded.');
        } else {
    
          imageUploadFile = req.files.image;
          newImageName = Date.now() + imageUploadFile.name;
    
          uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
    
          imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.satus(500).send(err);
          })
    
        }

        const newBlog = new Blog({
            title: req.body.title ,
            description: req.body.description ,
            category:req.body.category,
            image: newImageName
        });

        await newBlog.save();

        req.flash('infoSubmit', 'Blog has been added');
        res.redirect('submit-blog');

    } catch (error) {
        // res.json(error);
        req.flash('infoErrors', error);
        res.redirect('submit-blog');
    }
    
}

// GET- ABOUT


exports.aboutInfo=async(req,res)=>{
    try{
        

        res.render('about');
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }  
}

// async function insertCategoryData(){
//     try{
//         await Contact.insertMany([
//             {"name":"Shilpi",
//               "email":"shuilpi2123@gmail.com",
//               "message":"this is"
//             },
//             {"name":"viney",
//             "email":"viney23@gmail.com",
//             "message":"this is viney"
//             }
//         ]);
//     }catch(error){
//         console.log('err',+ error);
//     }
// }

// insertCategoryData();


// async function insertCategoryData(){
//     try{
//         await Category.insertMany([
//             {"name":"International-Trip",
//               "image":"girl.jpg"
//             },
//             {"name":"Food",
//               "image":"girl.jpg"
//             }
//         ]);
//     }catch(error){
//         console.log('err',+ error);
//     }
// }

// insertCategoryData();

// async function insertBlogData(){
//     try{
//         await Blog.insertMany([
//             {"title":"Belly-Dance",
//               "description":"Belly dance is a dance that originates in Egypt. It features movements of the hips and torso. It has evolved to take many different forms depending on the country and region, both in costume and dance style; with the Egyptian styles and costumes being the most recognized worldwide due to Egyptian cinema",
//               "category":"Dancing",
//               "image":"belly-dance.jpg"
//             },
//             {"title":"Hip-POP",
//               "description":"Hip hop dance is a range of street dance styles primarily performed to hip hop music or that have evolved as part of hip hop culture. It is influenced by a wide range of styles that were created in the 1970s and made popular by dance crews in the United State",
//               "category":"Dancing",
//               "image":"hip-pop.jpg"
//             },
//             {"title":"Kathak",
//               "description":" Kathak is one of the eight major forms of Indian classical dance. It is the classical dance form from Uttar Pradesh. The origin of Kathak is traditionally attributed to the traveling bards in ancient northern India known as Kathakars or storytellers",
//               "category":"Dancing",
//               "image":"kathak.jpg"
//             },
//             {"title":"Cricket",
//               "description":"After finishing at the sixth place in the points table last season, Punjab Kings are all set to begin their campaign for the upcoming edition of Indian Premier League (IPL) 2023 against Kolkata Knight Riders on Saturday. Led by the veteran opening batter Shikhar Dhawan, the Kings will be guided by World Cup winning coach Trevor Bayliss, as they eye their maiden IPL title. During the auctions, PBKS bought England all-rounder Sam Curran for a whopping total of Rs 18.50 crore and made him the costliest buy in IPL history",
//               "category":"Sports",
//               "image":"circket.jpg"
//             },
//             {"title":"Tennis",
//               "description":" World number one Carlos Alcaraz charged into the quarter-finals of the ATP Miami Open with a convincing 6-4, 6-4 victory over Tommy Paul on Tuesday but second seed Stefanos Tsitsipas was knocked out by Russian Karen Khachanov. Alcaraz, the defending Miami champion and also the winner at Indian Wells earlier this month, will face another American in the last eight when he comes up against Taylor Fritz. Paul came into the match having won his last 12 encounters with Spanish players, including wins over Alcaraz and Rafael Nadal last year, but he was unable to get a foothold in the contes",
//               "category":"Sports",
//               "image":"tennis.jpg"
//             },
//             {"title":"Football",
//               "description":"Argentina captain Lionel Messi on Tuesday scored his 100th international goal for the world champions as they marched to a 7-0 friendly victory over outclassed Curacao. Seven-time Ballon d'Or winner Messi opened the scoring against the Caribbean island minnows on 20 minutes in Santiago del Estero. It came 17 years after he opened his Argentina account in a 3-2 defeat to Croatia in March 2006. The 35-year-old soon added another just after the half-hour mark to make it 3-0, and then completed his hat-trick on 37 minutes with the fifth as Argentina toyed with their overmatched opponents. It was his seventh hat-trick for the national team.",
//               "category":"Sports",
//               "image":"football.jpg"
//             },
//         ]);
//     }catch(error){
//         console.log('err',+ error);
//     }
// }

// insertBlogData();