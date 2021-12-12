const jwt = require('jsonwebtoken')
exports.requireSignin = (req, res, next) => {
	console.log("[+]Request to requireSignin");
    if (req.headers.authorization) {
		console.log("[+]Success from requireSignin");
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

    } else {
		console.log("Error from requireSignin")
        return res.status(400).json({ message: "autherization required" })
    }
    next();
	console.log("[+]Finished  requireSignin");


    //jwt.decode()
}

exports.userMiddleware = (req, res, next) => {
	console.log("[+]Request to userMiddleware");
    if (req.user.role !== 'user') {
		console.log("[+]Error from requireSignin");
        return res.status(400).json({ message: 'User Access Denied' })
    }
    next();
	console.log("[+]Finished userMiddleware");
}
exports.adminMiddleware = (req, res, next) => {
	console.log("[+]Request to adminMiddleware");
    if (req.user.role !== 'admin') {
		console.log("[+]Error from adminMiddleware");
        return res.status(400).json({ message: 'Admin Access Denied' })
    }
    next();
	console.log("[+]Finished adminMiddleware");
}
