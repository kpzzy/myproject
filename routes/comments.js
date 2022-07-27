const express = require("express");
const Guitar = require("../schemas/guitar");
const Comments = require("../schemas/comments");
const { countDocuments } = require("../schemas/guitar");
const router = express.Router();

// 댓글창 풀 조회
router.get("/", async (req,res) => {
    const { user } = req.query;
    
    const comments = await Comments.find({ user });
    // const contents = comments.map((user) => user.user);
    // console.log(contents)
    
    // const guitars = await Guitar.find({ user : contents })
    // console.log(guitars)
    res.json({
      comments,
    })
    
    
});
// 댓글창 조회 guitarId 값이 같은것만 불러와주세요  
// router.get("/:guitarId", async (req, res) => {
//   const comment = await Comments.find()
//   // console.log(comment) 코멘트 목록 다 불러오기
//   const guitarIds = comment.map((item) => item.guitarId);       
//   // console.log(guitarIds)
//   //  내가 어떤 게시물에 글썼는지 기타 아이디값 3,5,3을 불러옴
//   const guitars = await Guitar.find({ guitarId: guitarIds })
//   // console.log(guitars) 
//   // 위에는 기타포스팅한 글을 불러온다 그리고 기타아이디값을 기준으로 찾음

//   // comment 라는 배열이 있음 근데 맵함수를 씀
//   // comment1 이라쓴 요소마다 리턴하는데 리턴의 코멘트는 guitarId가 같을때 찾음

//   // 기타스 = 댓글이 있는 애들
//   res.json({
//     comment : guitars.map((comment1) => {
//       return {
//         postname : comment1.name,
        
//         comment : comment.find((comment2) => {
//           console.log(comment2.guitarId)
//           return comment1.guitarId === comment2.guitarId})
//       }
//     })
//   })
// })

// 기타아이디값으로 댓글목록 불러오기
router.get("/:guitarId", async (req, res) => {
  const { guitarId } = req.params;

  const guitars = await Comments.find({ guitarId: Number(guitarId) });
  console.log(guitars)

  res.json({
    guitars,
  });
});

// 댓글 쓰기
// 내용이 비어있으면 작성 불가
router.post("/:guitarId", async (req,res) => {
    const { user, password, content, guitarId, commentId, cmtdate } = req.body;

    // const comments = await Comments.find({ guitarId })
    // // console.log(comments)

    if(content == ""){
      return res.status(400).json({ message : "댓글 내용을 입력해주세요"})
    } else {
      const createdComments = await Comments.create({ content, user, password, guitarId, commentId, cmtdate:Date.now() });
      return res.json({ message: "댓글을 생성하였습니다" })
    
      res.json({ createdComments });
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
    await Comments.deleteOne({ guitarId });
  } else {
    return res.status(400).json({ message : "지울게 없음"})
  }
  res.json({ success : "삭제완료"})
})

// 수정기능
// 기타아이디랑 댓글코멘트 아이디로 확인하고 수정 없으면 없다라고 알려주기
router.put("/:guitarId/:commentId", async (req, res) => {
  const { guitarId } = req.params;
  console.log({guitarId})
  const { commentId } = req.params;
  console.log({commentId})
  // const { name } = req.body;
  const { content } = req.body;
  const itGuitar = await Comments.find({ guitarId, commentId });
  console.log(itGuitar)
  

  if(itGuitar.length==0){
    return res.status(400).json({ success : false , message : "없어요" })
  }
  await Comments.updateOne({ guitarId : guitarId, commentId : commentId }, {$set: {content}})
  res.json({ success: true})

  // if (!itGuitar.length){
  //   await Comments.updateOne({ guitarId : Number(guitarId), commentId : Number(commentId) }, {$set: {content}})
  // } else {
  //   return res.json({ message : "수정할게 없음"})
  // }
  // res.json({ success : "수정 완료"});
})

module.exports = router;