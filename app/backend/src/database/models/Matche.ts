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

Matche.belongsTo(Team, { foreignKey: 'away_team_id', as: 'awayTeam' });
Matche.belongsTo(Team, { foreignKey: 'home_team_id', as: 'homeTeam' });

Team.hasMany(Matche, { foreignKey: 'away_team_id', as: 'awayTeam' });
Team.hasMany(Matche, { foreignKey: 'home_team_id', as: 'homeTeam' });

export default Matche;
