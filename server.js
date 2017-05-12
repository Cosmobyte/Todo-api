var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var _ = require('underscore');

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('Todo API Root');
});
// GET /todos
app.get('/todos',function(req,res){
	res.json(todos);
});
// GET /todos/:id
app.get('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id: todoId});
	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
	
});
//POST /todos/
app.post('/todos',function(req,res){
	var body = _.pick(req.body,"description","completed");

	body.id = todoNextId++;
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}
	body.description = body.description.trim();
	todos.push(body);

	res.json(body);
});
//DELETE /todos/:id
app.delete('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id:todoId});
	if(matchedTodo){
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
});
//put /todos/:id
app.put('/todos/:id',(req,res) => {
		var todoId = parseInt(req.params.id,10);
		var body = _.pick(req.body,"description","completed");
		var validAttributes = {};
		var matchedTodo = _.findWhere(todos,{id:todoId});

		if(!matchedTodo){
			return res.status(404).send();
		}

		if(body.hasOwnProperty('completed')&& _.isBoolean(body.completed)){
			validAttributes.completed = body.completed;
		} else if(body.hasOwnProperty('completed')){
			return res.status(400).send();
		}
		if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
			validAttributes.description = body.description;
		} else if(body.hasOwnProperty('description')){
			return res.status(400).send();
		}
		
		_.extend(matchedTodo,validAttributes);
		res.json(matchedTodo);


});
app.listen(PORT,function(){
	console.log('Express listening on port' + PORT +'!');
});