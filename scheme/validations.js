module.exports = {
    validate: function (validation) {
        return (req, res, next) => {
            try {                
                validation(req.params);
                next();
            } catch (error) {
                next(error)
            }
        }
    },
    validate_input: function (data) {
        const { city } = data;

        if (city !== undefined) {
            if (typeof city !== 'string') {
                throw new Error('la ciudad debe ser una cadena de caracteres');
            }            
            if (city.search(/^[a-zA-Z]+/) === -1) {
                throw new Error('la ciudad debe ser una cadena de caracteres');
            }
        }
    }
}