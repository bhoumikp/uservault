export const Toast = () => {
	return (
		<div id="toast" className="toast position" role="alert">
			<div className="d-flex">
				<div className="toast-body">
					Hello, world! This is a toast message.	
				</div>
				<button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
		</div>
	);
}