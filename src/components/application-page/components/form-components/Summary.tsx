import React from 'react';

const Summary = ({selectedProfile, formValues}:any) => {
    const lang:any = {
        selected_profile: "Wybrany profil",
        name: "Imię",
        surname: "Nazwisko", 
        birth_date: "Data urodzenia", 
        pesel_number: "Numer PESEL", 
        email: "Adres e-mail", 
        phone_number: "Numer telefonu", 
        postal_code: "Kod pocztowy", 
        address: "Adres zamieszkania"
    };

    formValues = {
        selected_profile: selectedProfile,
        ...formValues
    };

    return (
        <div id="summary">
            <div className="title">Podsumowanie</div>
            <div className="summary__container">
                {Object.keys(formValues).map((formValue:any, index:number) => (
                    <div className="summary_inner__container" key={index}>
                        <div className="category__name">{lang[formValue]}</div>
                        <div className="category__value">{formValues[formValue]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summary;