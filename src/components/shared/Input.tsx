import React from 'react';

const Input = ({handleChange, containerClassName, name, value, type, placeholder, renderAsTextArea}:any) => {
	let [ error, setError ] = React.useState(false);
	
	const innerHandleChange = (e:any) => setError(handleChange(e));
	
	return ( 
		<div className={`input__container${containerClassName ? ` ${containerClassName}` : ""}`}>
			{
				renderAsTextArea ? (
					<textarea
						className={`input${error ? " input__error" : ""}`}
						value={value}
						name={name}
						onChange={innerHandleChange}
						placeholder={placeholder}
					/>
				) : (
					<input
						autoComplete="off"
						className={`input${error ? " input__error" : ""}`}
						value={value}
						name={name}
						onChange={innerHandleChange}
						type={type}
						placeholder={placeholder}
					/>
				)
			}
			
		</div>
	);
}
export default React.memo(Input);