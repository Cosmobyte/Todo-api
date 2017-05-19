module.exports = function(sequelize, DataTypes){
	return sequelize.define('todo',{
			description: {
				type: DataTypes.STRING,
				alowNull: false,
				validate: {
					len:[1,250]
				}
			},
			completed: {
				type: DataTypes.BOOLEAN	,
				alowNull: false	,
				defaultValue: false		
			}
});
}