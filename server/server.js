import 'dotenv/config';
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
})




// db migration
// error handling utility

//--c hash password
//--c compare passwords