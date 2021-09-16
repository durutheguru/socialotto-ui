var history = require('connect-history-api-fallback');
var express = require('express');

var app = express();

// app.use(history());
app.use(express.static('dist'));

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Socialotto UI app listening on port ${port}!!!`);
});
