const express = require('express');
const cors = require('cors');
const router = require('./controller/index');
const sync = require('./middleware/sync');


const boot = () => {
    sync()

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(router);

    app.listen(8000, () => {
        console.log('server is running on http://localhost:8000');
    })
}

boot()