const debug = require('debug')('nodejs-assignment:validatelogin');
function validate(User) {
    //function to check if the user is present or not
    function validateLoginUser(req, res, next) {
        const {
            userEmail
        } = req.body;
        User.findOne({
            userEmail
        }, (err, user) => {
            if (err) {
                debug(`error`);
                res.status(400).json({
                    error: err,
                });
            } else if (!user) {
                debug(`user doesnt exist`);
                res.status(400).json({
                    error: 'User Does Not Exist',
                });
            } else {
                req.found = user;
                next();
            }
        });
    }
    return validateLoginUser;
}
module.exports = validate;