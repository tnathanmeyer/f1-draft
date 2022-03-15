import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

registerRoute(
	/^https?:\/\/ergast\.com\/.*$/i,
	new StaleWhileRevalidate()
);
 
setupRouting();
setupPrecaching(getFiles());
