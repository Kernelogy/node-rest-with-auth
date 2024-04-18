exports.responseWithData = (res, data, message) => {
    const resData = {
        status: true,
        message: message,
        data: data
    } 
    return res.status(200).send(resData)
}

exports.responseWithoutData = (res, message) => {
    const resData = {
        status: true,
        message: message
    }
    return res.status(200).json(resData)
}

exports.responseWithError = () => {}

exports.responseWithErrorAndData = () =>{}