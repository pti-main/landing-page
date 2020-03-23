import React from 'react';

const Input = ({handleChange, name, value, type, placeholder}:any) => {
	let [ error, setError ] = React.useState(false);
	
	const innerHandleChange = (e:any) => setError(handleChange(e));
	
	return ( 
		<div className="input__container">
			<input
				autoComplete="off"
				className={`input${error && " input__error"}`}
				value={value}
				name={name}
				onChange={innerHandleChange}
				type={type}
				placeholder={placeholder}
			/>
		</div>
	);
}
export default React.memo(Input);