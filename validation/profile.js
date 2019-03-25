const Validator = require('validator');
const isEmpty = require( './is-empty');


module.exports = function validateProfileInput(data){
    let errors = {};
     //this uses our isempty function. turns all nule vlues etc into empty strings
   
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.status : '';


    if(!Validator.isLength(data.handle, {min: 2, max: 40})){
        errors.handle = 'Handle needs to be between 2 and 4 charecters';
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }
    if(Validator.isEmpty(data.status)){
        errors.handle = 'Status is required';
    }
  
    if(Validator.isEmpty(data.skills)){
        errors.handle = 'Skills is required';
    }
    
    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'not a valid url';
        }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.website = 'not a valid url';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.website = 'not a valid url';
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.website = 'not a valid url';
        }
    }
  

    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}