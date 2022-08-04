const express  = require('express');
const jwt = require('jsonwebtoken');
// const User = require("../schemas/user");
const User = require('../models/user');
const checktokenMiddleware = require('./check');
const router = express.Router();



router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;
    const regEXP = /^[a-zA-Z0-9_]{3,10}$/
    const passwordEXP = /^[a-zA-Z0-9_]{4,16}$/
    // console.log(regEXP.test("test!"))
    // console.log(confirmPassword)
    const nickcheck = regEXP.test(String(nickname));
    // console.log(nickcheck)
    // console.log(nickname.indexOf(password))
    const passwordcheck = nickname.indexOf(password);
    const passwordlength = passwordEXP.test(password);
    // console.log(passwordlength)
    // console.log(passwordcheck)
    if(!passwordlength){
    return  res.status(400).send({
        errorMessage : "비밀번호는 알파벳과 숫자의 4자리 이상조합이여야합니다"
      })
    }
    if(passwordcheck !== -1){
    return  res.status(400).send({
        errorMessage : "비밀번호에는 아이디값이 중복되어서는 안됩니다."
      })
    }
    if(!nickcheck){
    return  res.status(400).send ({
        errorMessage :"닉네임은 알파벳 대소문자와 숫자만 가능하며 3자리 이상입니다"
      })
      
    }
    if (password !== confirmPassword) {
    return  res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
      });
      
    }
    // 아 여기 왜 안돼 
    const existUsers = await User.findAll({
      
      where: {
        "nickname": req.body.nickname
      }
    })
    console.log(existUsers.length)

    if(existUsers.length !== 0){
      return res.status(400).send({
        errorMessage : '이미 가입된 닉네임이나 이메일이 있음'
      })
    }

    // const existsUsers = await User.findAll({  
    //     $or: [{ nickname }],
    // }); 
    // // console.log(existsUsers)
    // if(existsUsers.length){
    //     return res.status(400).send({
    //         errorMessage : '이미 가입된 닉네임이나 이메일이 잇음'
    //     })
        
    // }

    // const user =  new User({ nickname, password });
    // await user.save();
    
    // return res.status(201).send({});
    
    try {
      const user = await User.create({
        nickname : req.body.nickname,
        password : req.body.password,
      });
      console.log(user);
      res.status(201).json(user);
      
    } catch (err) {
      console.error(err);
      next(err);
    }
    
});

router.post("/auth" , async (req, res) => {
    const { nickname, password } = req.body;
  
    const user = await User.findOne({ nickname, password });
    console.log(user)
  
    if(nickname !== user.nickname || password !== user.password){
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

// router.route('/')
//   .get(async (req, res, next) => {
//     try {
//       const users = await User.findAll();
//       res.json(users);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })
//   .post(async (req, res, next) => {
//     try {
//       const user = await User.create({
//         nickname: req.body.nickname,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword,
//       });
//       console.log(user);
//       res.status(201).json(user);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   });

// router.get('/:id/comments', async (req, res, next) => {
//   try {
//     const comments = await Comment.findAll({
//       include: {
//         model: User,
//         where: { id: req.params.id },
//       },
//     });
//     console.log(comments);
//     res.json(comments);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;