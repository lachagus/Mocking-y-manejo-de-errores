//Estos parámetros son los que usa express para manejar los errores.
//Es un middleware que se va a ejecutar cuando se producen errores de manera interna.
export const errorHandle = (err, req, res, next) => {
    const status = err.status || 500;
    //Si el status es 500 --> manda mje. "Internal server error", sino l mje. customizado
    const message =  status === 500 ? "Internal server error" : err.message;

    res.status(status).json({
        error: {
            //message: message,
            //status: status
            //Lo anterior es lo mismo que:
            message,
            status
        },
    });
};  