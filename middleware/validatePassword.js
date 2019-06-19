const bcrypt = require('bcrypt');

//function to check if the entered password is valid or not
function validatePassword(req, res, next) {
    const { password } = req.body;
    const user = req.found;
    bcrypt.compare(password, user.password, (err, valid) => {
        if (!valid) {
            res.status(401).json({
                error: "invalid Password"
            });
        } else {
            next();
        }
    });
}
module.exports = validatePassword;