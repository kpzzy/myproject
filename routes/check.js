const jwt = require("jsonwebtoken");


const checktokenMiddleware = async (req, res, next) => {
    const tokencheck = req.header('token');
	if (tokencheck == null) {
		res.status(403).json({success:false, errormessage:'로그인이 필요'});
	} else {
		try {
			const tokenInfo = await new Promise((resolve, reject) => {
				jwt.verify(tokencheck, 'secret', 
					(err, decoded) => {
						if (err) {
							reject(err);
						} else {
							resolve(decoded);
						}
					});
			});
			req.tokenInfo = tokenInfo;
			next();
		} catch(err) {
			console.log(err);
			res.status(403).json({success:false, errormessage:'인증실패'});
		}
	}
}

    

module.exports = checktokenMiddleware;

