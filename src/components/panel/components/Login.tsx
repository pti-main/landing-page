import React, { useState, useEffect } from 'react';
import { SHA512, SHA256 } from 'crypto-js';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCookies } from 'react-cookie';

import useFormValidation from '../../shared/useFormValidation';
import Input from '../../shared/Input';

let loginQuery = gql`
    mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            data
            success
            token
            message
        }
    }
`;

let validateQuery = gql`
    mutation ($token: String!) {
        validateToken(token: $token) {
            success
            message
            token
            data
        }
    }
`;

const Login = ({ setLoggedIn, setUserInfo, displayToast, history }:any) => {
    const INIT_DATA = {
        email: 'abc@abc.com',
        password: '123'
    };

    const [ postLogin ]:any = useMutation(loginQuery);
    const [ cookies, setCookie ] = useCookies();
    const [ validated, setValidated ]:any = useState({
		0: true
	});
    const { values, handleChange:handlePersChange, resetForm } = useFormValidation(INIT_DATA);
    const [ sendingState, setSendingState ] = useState(false);
    let handleChange = (e:any) => handlePersChange(e, validated, setValidated, 0);
    let [ validateTokenQuery ] = useMutation(validateQuery);
    
    let validateToken = async () => {
        if (cookies["pti-token"] !== undefined && cookies["pti-token"] !== "please_login_again") {
            setSendingState(true);

            validateTokenQuery({
                variables: { 
                    token: cookies["pti-token"]
                }
            }).then((response) => {

                if (response.data.validateToken.success) {
                    let a = JSON.parse(response.data.validateToken.data),
                        token = response.data.validateToken.token;

                    setUserInfo({
                        token,
                        ...a
                    });

                    setSendingState(false);

                    displayToast(true, "Zalogowano za pomocą tokenu weryfikacyjnego.");

                    setLoggedIn(response.data.validateToken.success); 

                    return;
                } else if (response.data.validateToken.message === "token_expired")
                    displayToast(false, "Token weryfikacyjny wygasł po 7 dniach. Zaloguj się ponownie.");
                else 
                    displayToast(false, "Token weryfikacyjny nie był dłużej ważny. Zaloguj się ponownie.");
                
                setSendingState(false);

                setCookie("pti-token", "please_login_again", {
                    path: "/"
                });
            }).catch(() => {
                displayToast(false, "Jest problem z wysłaniem zapytania. Spróbuj ponownie później.");
                setSendingState(false);
            });
        }
    }

    useEffect(() => {
        
        validateToken();

        return () => {
            resetForm({
				email: '',
                password: ''
			});
			setValidated({
				0: false
			});
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    return (
        <div className="login-container">

            <form onSubmit={(e:any) => {
                e.preventDefault();

                if (sendingState)
                    return;

                setSendingState(true);
                postLogin({
                    variables: {
                        password: SHA512(SHA256(values.password).toString()).toString(),
                        email: values.email
                    }
                }).then((res:any) => {
                
                    if (res.data.login.success) {
                        let a = JSON.parse(res.data.login.data),
                            token = res.data.login.token;
                        setUserInfo({
                            token,
                            ...a
                        });
                        displayToast(true, "Pomyślnie zalogowano.");

                        setCookie("pti-token", token, {
                            path: "/",
                            maxAge: 8 * 24 * 60 * 60
                        });

                        setSendingState(false);
                    } else {
                        resetForm({
                            email: '',
                            password: ''
                        });
                        setValidated({
                            0: false
                        });
                        displayToast(false, "Niepoprawny adres email lub hasło.");
                        setSendingState(false);
                    }

                    setLoggedIn(res.data.login.success); 
                }).catch((err:any) => {
                    console.error(`Failed to send login request. (${err})`);
                    displayToast(false, "Jest problem z wysłaniem zapytania. Spróbuj ponownie później.");
                    setSendingState(false);
                });
            }}>
                <div className="form-title">Logowanie</div>
                <Input containerClassName="input-email" value={values.email} handleChange={handleChange} name="email" placeholder="Adres email"/>
                <Input containerClassName="input-password" value={values.password} handleChange={handleChange} type="password" name="password" placeholder="Hasło"/>

                <button type="submit" className={`input-button${!validated[0] || sendingState ? " disabled" : ""}`}>Dalej</button>
            </form>
        </div> 
    );
}

export default Login;