const postData = (api, args) =>
    fetch(api, args)
        .then(response =>
            response.json()           
        ).catch(error => {
        	//console.log('userservice', error)
            return error;
        }); 

const getData = (api) =>
    fetch(api)
        .then(response =>
            response.json()           
        ).catch(error => {
        	//console.log('userservice', error)
            return error;
        });         

export const userService = {
    postData,
    getData
};      