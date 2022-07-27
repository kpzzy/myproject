const express = require("express");
const Guitar = require("../schemas/guitar");
const Comments = require("../schemas/comments");
const { countDocuments } = require("../schemas/guitar");
const router = express.Router();

// 댓글창 풀 조회
router.get("/", async (req,res) => {
    const { user } = req.query;
    
    const comments = await Comments.find({ user }).select("-password -guitarId -commentId -__v");
    
    res.json({
      comments,
    })
    
    
});
// 기타 아이디값으로 댓글 조회
router.get("/:guitarId", async (req, res) => {
  const { guitarId } = req.params;

  const guitars = await Comments.find({ guitarId: Number(guitarId) }).sort({cmtdate : -1}).select("-password -guitarId -commentId -__v");
  console.log(guitars)

  res.json({
    guitars,
  });
});

// 댓글 쓰기
// 내용이 비어있으면 작성 불가
router.post("/:guitarId", async (req,res) => {
    const { user, password, content, guitarId, commentId } = req.body;
    // console.log(content)
    const comment = await Comments.find({guitarId})
    // console.log(comment)

    if(content.length === 0){
      return res.status(400).json({ message : "댓글 내용을 입력해주세요"})
    } else {
      const createdComments = await Comments.create({ content, user, password, guitarId, commentId, cmtdate:Date.now() });
      return res.json({ message: "댓글을 생성하였습니다" })
    
    }
    
    
})

// 삭제기능
// 아무것도 없으면 없다고 출력하기
router.delete("/:guitarId/:commentId", async (req, res) => {
  const { guitarId } = req.params;
  const { commentId } = req.params;
  console.log({commentId})
  const comment = await Comments.findOne({ "guitarId" : guitarId , "commentId" : commentId });
  console.log(comment)

  if (comment != null){
    await Comments.deleteOne({ commentId:commentId });
  } else {
    return res.status(400).json({ message : "지울게 없음"})
  }
  res.json({ success : "삭제완료"})
})

// 수정기능
// 기타아이디랑 댓글코멘트 아이디로 확인하고 내용이 없다면 없다라고 알려주기
router.put("/:guitarId/:commentId", async (req, res) => {
  const { guitarId } = req.params;
  // console.log({guitarId})
  const { commentId } = req.params;
  // console.log({commentId})
  const { content } = req.body;
  const itGuitar = await Comments.find({ guitarId, commentId });
  console.log(itGuitar)
  

  if(content.length===0){
    return res.status(400).json({ success : false , message : "댓글 내용을 입력해주세요" })
  }
  await Comments.updateOne({ guitarId : guitarId, commentId : commentId }, {$set: {content}})
  res.json({ success: true})

  
})

module.exports = router;