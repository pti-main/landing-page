const useValidateAuth = (values:any) => {
    let validationReq:any = {
        "name": {
            length: {
                min: 3,
                max: 50
            },
            regex: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
        },
        "surname": {
            length: {
                min: 2, 
                max: 30
            },
            regex: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
        },
        "birth_date": {
            regex: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
        }, 
        "pesel_number": {
            regex: /^\d{11}$/
        },
        "email": {
            length: {
                min: 3,
                max: 50
            },
            regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        "phone_number": {
            length: {
                min: 9,
                max: 15
            },
            regex: /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(\s?\d{3}){3}$/
        },
        "postal_code": {
            regex: /\d{2}-\d{3}(,|,\s{1})[a-zA-Z\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ-]{3,50}$/
        },
        "address": {
            length: {
                min: 4,
                max: 50
            },
            // regex: /(ul\.?|al\.?)?[a-zA-Z\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ-]{3,50}\s?,?\s?\d{1,5}?\w{0,3}?$/
            regex: /[a-zA-Z\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ,.\d-]{3,50}$/
        },

        "title": {
            length: {
                min: 3,
                max: 50
            },
            regex: /[a-zA-Z\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ,.\d-]{3,50}$/
        },

        "text_area": {
            length: {
                min: 20,
                max: 600
            },
            // regex: /[a-zA-Z\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ@!+-?"',.\d-]{20,600}$/
        },
        "password": {
            length: {
                min: 3,
                max: 50
            }
        }
    }

    /**
     * 
     * @return boolean: is error present
     */
    const validate = (name:string, value:string) => {
        let error:boolean = false;
        let validation:any = validationReq[name];

        if (validation === undefined) {
            console.log("%cThis is emergency error, that means code is fucked not your input", "color: lightcoral; font-size: 0.9rem");
            return true;
        }
        
        if (validation.length !== undefined) 
            if (value.length < validation.length.min || value.length > validation.length.max)
                error = true;
        
        if (validation.regex !== undefined)
            if (!validation.regex.test(value))
                error = true;

        return error;
    }


    return { validate };
}

export default useValidateAuth;