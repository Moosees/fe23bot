import { KattCount } from './katt-count.js';

export const syncModels = async () => {
	console.log('Syncing models');

	// Add all models here:
	KattCount.sync(); // sync the table to be ready to use or initialize it if it's new
	// KattCount.sync({ force: true }) // force the table to be reset when syncing even if it already exists (and needs to be changed) as in delete all data
};
