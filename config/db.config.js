const { setRandomFallback } = require('bcryptjs');
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected successfully'))
    .catch((e) => {
        console.log(`connection to DB failed`);
        console.log(e.message);
        process.exit(1)
    })