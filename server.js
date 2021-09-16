import history from 'connect-history-api-fallback';
import express from 'express';

var app = express();
app.use(history());


