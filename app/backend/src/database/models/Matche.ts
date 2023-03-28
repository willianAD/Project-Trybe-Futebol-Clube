import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Matche extends Model {
  declare id: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
  declare homeTeamId: boolean;
}

Matche.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Team.belongsTo(Matche, { foreignKey: 'id', as: 'awaysTeamId' });
Team.belongsTo(Matche, { foreignKey: 'id', as: 'homeTeamId' });

Matche.hasMany(Team, { foreignKey: 'away_team_id', as: 'awaysTeamId' });
Matche.hasMany(Team, { foreignKey: 'home_team_id', as: 'homeTeamId' });

export default Matche;
