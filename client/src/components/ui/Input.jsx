export const Input = ({ label, type, placeholder=null, listener }) => {
	return (
		<div>
			<label className="form-label fw-semibold my-md-2">{label}</label>
			<input 
				onChange={(e) => listener(e.target.value)} 
				className="form-control auth-input" 
				type={type} 
				placeholder={placeholder} 
				required
			/>
		</div>
	);
}