const express  = require('express');
const jwt = require('jsonwebtoken');
const User = require("../schemas/user");
const checktokenMiddleware = require('./check');
const router = express.Router();



router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;
    console.log(confirmPassword)
    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
      });
      return;
    }


    const existsUsers = await User.find({  
        $or: [{ nickname }],
    }); 
    // console.log(existsUsers)
    if(existsUsers.length){
        res.status(400).send({
            errorMessage : '이미 가입된 닉네임이나 이메일이 잇음'
        })
        return;
    }

    const user = new User({ nickname, password });
    await user.save();

    res.status(201).send({})
});

router.post("/auth" , async (req, res) => {
    const { nickname, password } = req.body;
  
    const user = await User.findOne({ nickname, password }).exec();
  
    if(!user){
      res.status(400).send({
        errorMessage: "이메일 또는 비밀번호가 잘못됨",
      });
      return;
    }
  
    const token = jwt.sign({ userId: user.userId }, "secret");
    // console.log(user)
    res.send({
      token,
    })
  });


module.exports = router;