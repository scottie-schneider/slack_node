var express = require('express');
var app = express();
var request = require('request');
var Intercom = require('intercom-client');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 9001));

app.get('/', function(req, res){
  res.send('it works');
})

app.post('/post', function(req,res){

  var client = new Intercom.Client({ token: 'dG9rOmU0ODBiZTI2Xzg2NGJfNDdiNV84ZDg4Xzk0NjZlODgyNTczNToxOjA=' });
  client.counts.appCounts(function (d) {
    // d is the response from the server
    let number = d.body.user.count;
    console.log(number);
    let slack = {
      "response_type": "in_channel",
      "text": number
    }
    console.log(slack);
    res.send(slack);
    //console.dir(d.body.user.count);
  });
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
