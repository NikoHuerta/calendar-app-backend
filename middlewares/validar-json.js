const validarJSON = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
        res.status(400);
        res.set('Content-Type', 'application/json');
        res.json({
            ok: false,
            msg: 'JSON malformed'
        });
    } else {
        next();
    }
}
 
module.exports = {
    validarJSON
}