const express=require('express');
const router=express.Router();
const blogController=require('../controllers/blogController');

router.get('/',blogController.homepage);
router.get('/blog/:id', blogController.exploreBlogs);
router.get('/categories',blogController.exploreCategories);
router.get('/categories/:id',blogController.exploreCategoriesById);
// router.post('/search',recipeController.searchBlog);
router.get('/contact',blogController.Explorecontact);
router.post('/contact',blogController.contactInfoSubmit);
router.get('/explore-latest',blogController.exploreLatest);
router.get('/explore-random',blogController.exploreRandom);
router.get('/submit-blog',blogController.submitBlog);
router.post('/submit-blog',blogController.submitBlogOnPost);
router.get('/about',blogController.aboutInfo);
module.exports=router;