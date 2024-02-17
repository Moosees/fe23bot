import { KattCount } from './katt-count.js';

export const syncModels = async () => {
	KattCount.sync(); // sync the table to be ready to use or initialize it if it's new
	// KattCount.sync({ force: true }) // force the table to be reset when syncing even if it already exists (and needs to be changed)

	console.log('Syncing models');
	console.log(await KattCount.findAll());
};
