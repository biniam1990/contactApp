var express = require('express');
var fs= require('fs');
var util= require('util');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contactus', { title: 'Contact us' });
});

router.post('/',function(req,res,next){
  console.log(req.body);
     //res.send('welcome'+req.body.fname);
     console.log(req.ip);
     req.assert('fname','first name should not be empty').notEmpty();
     req.assert('message','Message should not be empty').notEmpty();
      req.getValidationResult().then(function(result){
        console.log(result.isEmpty());
        console.log(result);
         if(!result.isEmpty()) {
            res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
              return;
         }
          const writable= fs.createWriteStream('./requestFile.txt');
        writable.write('full-name: '+req.body.fname+'\n'+'complaint: '+req.body.type
        +'\n Message: '+req.body.message);

     res.redirect("./thankyou");
     });
    
})

module.exports = router;
