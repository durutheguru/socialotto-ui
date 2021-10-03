
var express = require('express');
var history = require('connect-history-api-fallback');


// const replace = require('replace-in-file');

// replace(
//     {
//         files: 'package.json',
//         from: /h/g,
//         to: 'Replacement'
//     }
// ).then(
//     changedFiles => {
//         console.log('Modified files:', changedFiles.join(', '));
//     }
// ).catch(
//     error => {
//         console.error('Error occurred:', error);
//     }
// );

var app = express();

app.use(history());
app.use(express.static('dist'));

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Socialotto UI app listening on port ${port}!!!`);
});
