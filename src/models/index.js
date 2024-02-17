import { KattCount } from './katt-count.js';

export const syncModels = async () => {
	KattCount.sync();
	console.log('Syncing models');
	console.log(await KattCount.findAll());
};
