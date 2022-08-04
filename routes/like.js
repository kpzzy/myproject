const express = require('express');
const {Like} = require('../models');
// const Comment = require('../models/comment');
const checktokenMiddleware = require('./check');

const router = express.Router();

router.post('/', checktokenMiddleware, async (req, res, next) => {
    try {
      const like = await Like.create({
        like: req.body.like,
      });
      console.log(like);
      return res.status(200).json(like);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
router.delete("/:id", checktokenMiddleware, async(req,res,next)=> {
    try {
        await Like.destroy({
            where: {id: parseInt(req.params.id)},
        });
        return res.send('삭제 성공?')
    } catch (err){
        console.error(err);
        next(err);
    }
})

router.route("/:id")
    .delete(checktokenMiddleware, async(req,res,next)=> {
    try {
        await Like.destroy({
            where: {id: req.params.id},
        });
        return res.send('삭제 성공?')
    } catch (err){
        console.error(err);
        next(err);
    }
    })
    .put(checktokenMiddleware, async (req, res, next) => {
        try {
          await Like.update({
            like : req.body.like + 1,
          }, {
            where: { id: req.params.id },
          });
          res.json(result);
        } catch (err) {
          console.error(err);
          next(err);
        }
      })


module.exports = router;