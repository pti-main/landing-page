import React, { useState } from 'react';
import Input from '../../../shared/Input';

const PersonalInfo = ({values, handleChange}:any) => {
  	return (
		<div className="personal__info__container">
			<div className="title">Wypełnij poniższy formularz</div>
			<div className="form-grid">
				<form>
					<div className="row__name">Twoje informacje</div>
					<Input value={values.name} handleChange={handleChange} type="text" name="name" placeholder="Imię" />
					<Input value={values.surname} handleChange={handleChange} type="text" name="surname" placeholder="Nazwisko" />

					<Input value={values.birth_date} handleChange={handleChange} type="text" name="birth_date" placeholder="Data urodzenia ucznia (dd.mm.yyyy)"/>
					<Input value={values.pesel_number} handleChange={handleChange} type="text" name="pesel_number" placeholder="Numer PESEL ucznia"/>
					
					<div className="row__name">Informacje rodziców</div>
					<Input value={values.email} handleChange={handleChange} type="text" name="email" placeholder="Adres e-mail rodzica"/>
					<Input value={values.phone_number} handleChange={handleChange} type="tel" name="phone_number" placeholder="Numer telefonu rodzica"/>
					
					<div className="row__name">Adres</div>
					<Input value={values.postal_code} handleChange={handleChange} name="postal_code" placeholder="Kod pocztowy ucznia, miejscowość"/>
					<Input value={values.address} handleChange={handleChange} name="address" placeholder="Ulica i numer domu"/>
				</form>
	  		</div>
		</div>
  	);
}
export default React.memo(PersonalInfo);