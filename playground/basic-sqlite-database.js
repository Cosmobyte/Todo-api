var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{
	'dialect' : 'sqlite',
	'storage' : __dirname + '/basic-sqlite-database.sqlite'
});
var Todo = sequelize.define('todo',{
	description: {
		type: Sequelize.STRING,
		alowNull: false,
		validate: {
			len:[1,250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN	,
		alowNull: false	,
		defaultValue: false		
	}
});

	var User = sequelize.define('user',{
		email: Sequelize.STRING
	});

	Todo.belongsTo(User);
	User.hasMany(Todo);

sequelize.sync().then(function(){
	console.log('Everyting is synced');

	User.create({
		email: 'cosmin@example.com'
	}).then(function(){
		return Todo.create({
			description:'Clean yard'
		});
	}).then(function(todo){
		User.findById(1).then(function(user){
			user.addTodo(todo);
		});
	})



	Todo.findById(2).then(function(todo){
		if(todo){
			console.log(todo.toJSON());
		} else {
			console.log('Todo not found');
		}
	});
	
});