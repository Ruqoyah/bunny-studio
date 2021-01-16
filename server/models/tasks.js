export default (sequelize, DataTypes) => {
    const Tasks = sequelize.define('Tasks', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'to-do'
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'user_id',
        }
      },
    });
    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Users, {
          foreignKey: 'user_id'
        });
      };
    return Tasks;
  };
  