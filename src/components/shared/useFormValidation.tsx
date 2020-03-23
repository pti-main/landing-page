import { useState } from 'react';
import useValidateAuth from './useValidateAuth';

const useFormValidation = (inititalState:any) => {
    const [ values, setValues ] = useState(inititalState);
    const { validate } = useValidateAuth(values);
    
    const handleChange = (e:any, validated:any, setValidated:any, currentStage:number) => {
        setValues({
            ...values,
            [ e.target.name ]: e.target.value
        });

        setValidated({
            ...validated,
            [ currentStage ]: !validateAll(e.target.name, e.target.value)
        });

        return validate(e.target.name, e.target.value);
    }

    const validateAll = (name:string, value:string) => {
        let err:boolean = false;
        let a = values;
        a[name] = value;

        Object.keys(a).forEach(key => { 
            if (validate(key, a[key])) {
                err = true;
            }
        });
        return err;
    }

    const resetForm  = () => {
        setValues(inititalState);
    }

    return { values, handleChange, validateAll, resetForm }
}

export default useFormValidation;

