var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/belt_db');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var PetSchema = new mongoose.Schema({
    
    name: { 
        type: String, 
        required: [true, "Pet name cannot be blank"], 
        validate: [{
            validator: function(checkname) {
                var found = true;
                return new Promise(function(resolve, reject){
                    Pet.findOne({ name: checkname}, function(err, pet) {
                        if(pet != null){
                            found = false;
                            resolve(found);
                        } else{
                            found =  true;
                            resolve(found);
                        }
                    })
                })
                return found;
            },
            message: "This name is already in use for a pet"
        },       
    ],
        minlength: [3, "Pet name needs to be at least 3 characters"]
    },
    type: { 
        type: String, 
        required: [true, "Pet type cannot be blank"], 
        minlength: [3, "Pet type needs to be at least 3 characters"]

    },
    description: { 
        type: String, 
        required: [true, "Pet description cannot be blank"], 
        minlength: [3, "Pet description needs to be at least 3 characters"]
    },
    skill1: { 
        type: String, 
    },
    skill2: { 
        type: String, 
    },
    skill3: { 
        type: String, 
    },
    likes:{
        type: Number,
        default: 0
    }

}, {timestamps: true});


mongoose.model('pets', PetSchema); 

var Pet = mongoose.model('pets');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // tell body-parser to read JSON

app.use(express.static( __dirname + '/belt-app/dist' ));

app.post('/newPet', function(req, res) {
    var pet = new Pet(req.body);
    pet.save(function(err) {
        if(err) {
            console.log('something went wrong', err);
            res.json({error: err})
        } else { 
            console.log('successfully added an pet!');
            res.json({message: "successfully added a pet"})
        }
    })
})

app.get('/allPets', function(req, res) {
    Pet.find({}, function(err, pets) {
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
         }
        else {
            console.log("server success")
            res.json({message: "Success", data: pets})
        }
    })
})

app.get('/getPet/:id', function(req, res) {
    Pet.findOne({_id: req.params.id}, function(err, pet) {
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
         }
        else {
            console.log("server success")
            console.log(pet);
            res.json({message: "Success", data: pet})
        }
    })
})
app.post('/like/', function(req, res) {
    Pet.update({_id: req.body.id}, {likes:req.body.likes}, function(err, pet){
        if(err) {
            console.log('something went wrong');
        } else { 
            console.log('successfully updated a task!');
            res.json({message: "successfully updated a task"})
        }
    })
});
app.delete('/removePet/:id/', function(req, res) {
    Pet.remove({_id: req.params.id}, function(err, task) {
        if(err) {
            console.log('something went wrong');
        } else { 
            console.log('successfully removed a task!');
            res.json({message: "successfully removed an Pet"})
        }
    })
})
app.put('/editPet/:id/', function(req, res) {
    Pet.update({_id: req.params.id}, req.body, function(err, task) {
        if(err) {
            console.log('something went wrong');
        } else { 
            console.log('successfully updated a task!');
            res.json({message: "successfully updated a task"})
        }
    })
})


app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./belt-app/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})