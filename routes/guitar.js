const express = require("express");
const Guitar = require("../schemas/guitar")
const router = express.Router();



// 기타목록 전체 조회
// 모든내용 다가져오고 내림차순 정렬
router.get("/", async (req, res) => {
  const { category } = req.query;
  // console.log("category", category)
  const guitars = await Guitar.find({ category }).sort({cmtdate : -1}).select("-category -guitarId -password -_id -__v");
  res.json({
    guitars: guitars
  });
});
// 기타 게시물 작성 아이디값으로 조회
router.get("/:guitarId", async (req, res) => {
  const { guitarId } = req.params;

  const [guitars] = await Guitar.find({ guitarId: Number(guitarId) }).select("-guitarId -password -_id -__v");

  res.json({
    guitars,
  });
});

// 포스팅기능
router.post("/", async (req, res) => {

  const { user, password, guitarId, name, category, date } = req.body;

  const guitars = await Guitar.find({ guitarId })
  // console.log(guitars)
  if (guitars.length) {
    return res
    .status(400)
    .json({ success: false, errorMessage: "이미 있는 기타 정보" })
  } else {
    const createdGuitars = await Guitar.create({ guitarId, name, category, user, password, date:Date.now() });
    return res.json({ message: "게시글을 생성하였습니다." })
  }

});

// 삭제기능
// 비번이 같아야만 작동
router.delete("/:guitarId", async (req, res) => {
  const { guitarId } = req.params;
  const body = req.body;
  console.log(body)
  const [itGuitar] = await Guitar.find({ guitarId });
  // console.log([itGuitar])

  if (itGuitar.password === body.password){
    await Guitar.deleteOne({ guitarId });
  } else {
    return res.status(400).json({ message : "본인만 삭제가능"})
  }
  res.json({ success : "삭제완료"})
})

// 수정기능
// 비번이 같아야만 작동
router.put("/:guitarId", async (req, res) => {
  const { guitarId } = req.params;
  const { name } = req.body;
  const body = req.body;
  // console.log(body)
  const [itGuitar] = await Guitar.find({ guitarId });

  if (itGuitar.password === body.password){
    await Guitar.updateOne({ guitarId : Number(guitarId) }, {$set: {name}})
  } else {
    return res.status(400).json({ message : "본인만 수정가능"})
  }
  res.json({ success : "수정 완료"});
})


// 위에 포스트에서 아이디값을 지정해서 보내는건 권장 ㄴㄴ 왜?why?
// 고유값을 내 마음대로 지정은 좀;;




module.exports = router;

