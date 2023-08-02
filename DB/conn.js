const mongoose =  require('mongoose');
require('dotenv').config();

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
        family: 4
	};
	try {
		mongoose.connect( process.env.LOCAL_DB, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};