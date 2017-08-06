'use strict';
const articleParser = require('./index');

articleParser('https://medium.com/@Aegist/how-to-end-googles-monopoly-5c46ef7db20d')
.then((result)=>{
    console.log(result);
}).catch((reason)=>{
    console.log(reason);
});
