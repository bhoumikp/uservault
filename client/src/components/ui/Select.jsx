export const Select = ({ label, listener, options }) => {
	return(
		<div>
			<label className="form-label fw-semibold mt-2">{label}</label>
			<select 
				onChange={(e) => listener(e.target.value)} 
				className='form-select auth-select' 
			>
				<option value="">Select {label}</option>
				{options.map((option, index) => <option value={option} key={index}>{option}</option>)}
			</select>
		</div>
	)
}