const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');
const app = express();

app.use(cors());
app.use(express.static('public/uploads'));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/room', require('./routes/room'));
app.use('/api/province', require('./routes/province'))
app.use('/api/ward', require('./routes/ward'))
app.use('/api/district', require('./routes/district'))

app.use('/api/post', require('./routes/post'))
// support for add post
app.use('/api/status_post', require('./routes/status_post'))
app.use('/api/service', require('./routes/service'))


app.use('/api/payment', require('./routes/payment_route'))
app.use('/api/subscription', require('./routes/subscription'))
app.use('/api/verify', require('./routes/verify_route'));
app.use('/api/login', require('./routes/login_route'));
app.use('/api/register', require('./routes/register_route'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 4000;


app.use(function(req, res, next) {
    res.status(404).json({
        message: 'endpoint not found'
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: 'server failure'
    });
});

app.listen(PORT, function() {
    console.log(` at http://localhost:${PORT}`);
});