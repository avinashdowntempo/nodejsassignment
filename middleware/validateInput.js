function validateInput(req, res, next) {
    let { input } = req.body;
    if (!input) {
        res.status(400).json({ error: "no input provided" });
    }
    else {
        next();
    }
}
module.exports = validateInput;