import { Sequelize } from 'sequelize';
import { sequelize } from '../tools/index.js';

export const KattCount = sequelize.define('kattCount', {
	user: {
		type: Sequelize.STRING,
		unique: true
	},
	count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}
});
