//function to validate whether all the required fields are present
function validateAuthFields(req, res, next) {
    const { userName, userEmail, password } = req.body;
    if (!userName || !userEmail || !password) {
        res.status(400).json({
            error: 'some fields are missing',
        });
    }
    else {
        next();
    }
}
module.exports = validateAuthFields;