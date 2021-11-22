const express = require('express');
//var cors = require('cors')
const MembersRouter = require('./SubscriptionsWS/Routers/routerMember');
const MovieRouter =require('./SubscriptionsWS/Routers/routerMovie')
const SubRouter = require('./SubscriptionsWS/Routers/Subrouter')

var app = express();

//app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SubscriptionsDB');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/Members', MembersRouter);
app.use('/api/Movies', MovieRouter);
app.use('/api/Sub', SubRouter);


app.listen(3000);

