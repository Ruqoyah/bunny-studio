export default (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'basic'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    Users.associate = (models) => {
        Users.hasMany(models.Tasks, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE'
        });
      };
    return Users;
  };
  