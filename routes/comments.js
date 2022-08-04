const express = require("express");
// const Guitar = require("../schemas/guitar");
// const Comments = require("../schemas/comments");
const Comment = require('../models/comment');
const User = require('../models/user');
const { countDocuments } = require("../schemas/guitar");
const checktokenMiddleware = require("./check");
const router = express.Router();

// 댓글창 아이디로 조회
router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// 기타 아이디값으로 댓글 조회
// router.get("/:guitarId", async (req, res) => {
//   const { guitarId } = req.params;

//   const guitars = await Comment.find({ guitarId: Number(guitarId) }).sort({cmtdate : -1}).select("-_id -password -guitarId -commentId -__v");
//   console.log(guitars)

//   res.json({
//     guitars,
//   });
// });


// 포스팅
router.post('/',checktokenMiddleware, async (req, res, next) => {
  if(!req.body.comment){
    return res.status(400).send({
      errorMessage : '댓글 내용을 입력해주세요'
    })
  }
  try {
    const comment = await Comment.create({
      id: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
  .put(checktokenMiddleware, async (req, res, next) => {
    try {
      const result = await Comment.update({
        comment: req.body.comment,
      }, {
        where: { id: req.params.id },
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(checktokenMiddleware, async (req, res, next) => {
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// // 삭제기능
// // 아무것도 없으면 없다고 출력하기
// router.delete("/:guitarId/:commentId", checktokenMiddleware, async (req, res) => {
//   const { guitarId } = req.params;
//   const { commentId } = req.params;
//   console.log({commentId})
//   const comment = await Comments.findOne({ "guitarId" : guitarId , "commentId" : commentId });
//   console.log(comment)

//   if (comment != null){
//     await Comments.deleteOne({ commentId:commentId });
//   } else {
//     return res.status(400).json({ message : "지울게 없음"})
//   }
//   res.json({ success : "삭제완료"})
// })

// // 수정기능
// // 기타아이디랑 댓글코멘트 아이디로 확인하고 내용이 없다면 없다라고 알려주기
// router.put("/:guitarId/:commentId", checktokenMiddleware, async (req, res) => {
//   const { guitarId } = req.params;
//   // console.log({guitarId})
//   const { commentId } = req.params;
//   // console.log({commentId})
//   const { content } = req.body;
//   const itGuitar = await Comments.find({ guitarId, commentId });
//   console.log(itGuitar)
  

//   if(content.length===0){
//     return res.status(400).json({ success : false , message : "댓글 내용을 입력해주세요" })
//   }
//   await Comments.updateOne({ guitarId : guitarId, commentId : commentId }, {$set: {content}})
//   res.json({ success: true})

  
// })

module.exports = router;