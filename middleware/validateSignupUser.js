const debug = require('debug')('nodejs-assignment:validatesignup');
function validate(UserModel) {

    //validate function to see if user is already registered with email id
    function validatesignupUser(req, res, next) {
        const { userEmail } = req.body;
        UserModel.findOne({
            userEmail
        }, (err, user) => {
            if (err) {
                res.status(400).json({
                    error: err,
                });
            } else if (user) {
                res.status(400).json({
                    message: 'User Already Registered',
                });
            } else {
                next();
            }
        });
    }
    return validatesignupUser;
}
module.exports = validate;