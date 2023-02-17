const router = require("express").Router();
const { models: { User, Comments, Comment_Like, Post, Project, Post_like } } = require('../db');




//get global feed
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit)
    const user = req.query.user
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const feed = [];

    const posts = await Post.findAll({include: [User, Project, Comments, Post_like]});
    const projects = await Project.findAll({include: ['member', Post]});
    posts.forEach(post => feed.push(post))
    projects.forEach(project => feed.push(project))
    feed.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    if (user) {
      feed.filter(item => item.type === 'post' && item.userId === user )
    }
    const results = {};

    if (endIndex < feed.length)
    results.next = {
      page: page + 1,
      limit: limit
    }

    if (startIndex > 0) {
      results.previous = {
        page: page  - 1,
        limit: limit
      }
    }
    
   
    results.results = feed.slice(startIndex, endIndex)
    res.send(results)
    
  } catch (error) {
    next(error);
  }
});

//find single comment by id
router.get("/:id", async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.id, {include: [User, Comment_Like, Post]});
    res.send(comment);
  } catch (error) {
    next(error);
  }
});

//router for new comment
router.post("/", async (req, res, next) => {
  try {
    const newComment = await Comments.create(req.body);
    res.send(newComment);
  } catch (error) {
    next(error);
  }
});

//router to update a comment
router.put("/:id", async (req, res, next) => {
  try {
    const updateComment = await Comments.findByPk(req.params.id);
    res.send(await updateComment.update(req.body));
  } catch (error) {
    next(error);
  }
});

// router to delete a comment base on id
router.delete('/:id', async(req,res,next)=>{
  try{
    const comment = await Comments.findByPk(req.params.id);
    await comment.destroy();
    res.send(comment)
  }catch (error){
    next(error)
  }
})

module.exports = router
