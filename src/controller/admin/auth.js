const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
	console.log("[+]Request to signup");
    User.findOne({
        email: req.body.email
    })
        .exec((error, user) => {

            if (user) return res.status(400).json({
                message: 'admin already registered'
            });
            //destucture req body
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
                role: 'admin'
            });

            _user.save((error, data) => {
                if (error) {
					console.log("[+]Error from saving signup");
                    return res.status(400).json({
                        message: 'something went wrong'
                    });
                }
                if (data) {
					console.log("[+]Success from signup");
                    return res.status(201).json({
                        message: 'Admin created successfully..!'
                    });
                }
            });

            if (error) {
                return res.status(400).json({
                    message: "error accured"
                });
            }

        });
}

exports.signin = (req, res) => {
	console.log("[+]Request to signin");
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') {
					
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.cookie('token',token,{expiresIn:'12h'});
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullName
                        }
                    });
                    console.log("[+]Success from Signin");

                } else {
					console.log("[+]Error from Signin");
                    return res.status(400).json({
                        message: 'invalid password'
                    });
                }


            } else {
				console.log("[+]Error from Signin");
                return res.status(400).json({ message: 'something went wrong' });
            }
        })
}

//signout 
exports.signout = (req, res) => {
	console.log("[+]Request to Signout");
    res.clearCookie('token');
    res.status(200).json({
		
        message: 'sign out successfully'
    });
    console.log("[+]Success from Signout");
}