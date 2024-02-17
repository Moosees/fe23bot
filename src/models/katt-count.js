import { Sequelize } from 'sequelize';
import { sequelize } from '../tools/index.js';

export const KattCount = sequelize.define('kattCount', {
	userId: {
		type: Sequelize.STRING,
		unique: true
	},
	userName: {
		type: Sequelize.STRING
	},
	count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}
});
