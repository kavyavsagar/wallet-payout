const transferData = (api, args) =>
    fetch(api, args)
        .then(response =>
            response.json()
        ).catch(error => {
            return error;
        }); 

export const transferService = {
    transferData
};      