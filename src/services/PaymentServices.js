const paymentData = (api, args) =>
    fetch(api, args)
        .then(response =>
            response.json()
        ).catch(error => {
            return error;
        }); 

export const paymentService = {
    paymentData
};      