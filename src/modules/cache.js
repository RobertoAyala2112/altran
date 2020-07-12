const LRU = require('lru-cache');

const memory = Symbol('memory');

/**
 *	Cache Manager class - Singleton
 */

class CacheManager {
	constructor() {
		this[memory] = {};
	}

	/**
	 *	Get a memory {@link https://github.com/isaacs/node-lru-cache LRU Cache} for a specific namespace
	 *	@param {string} namespace - The cache namespace
	 *	@return {LRU} LRUCache
	 *	@example
	 * const CacheManager = require('./modules/cache-manager');
	 * const cache = CacheManager.memory('ripple');
	 * const value = cache.get('cache-key');
	 */

	memory(namespace, settings = {}) {
		if (!this[memory][namespace]) {
			const options = {
				max: 500,
				maxAge: 1000 * 60 * 60, // 1 hour default max age
				...settings
				// Implement dispose function if we are saving in cache a value that needs to be close gracefully: File descriptor, database...
			};

			this[memory][namespace] = new LRU(options);
		}

		return this[memory][namespace];
	}

	/**
	 *	Prune memory cache/s: Manually iterates over the entire cache proactively pruning old entries
	 *	@param {string} [namespace] - The cache of the namespace that will be pruned. If empty all caches will be pruned
	 *	@private
	 *	@return {Promise}
	 */

	prune(namespace) {
		return this.clean(namespace, 'prune');
	}

	/**
	 *	Reset memory cache/s
	 *	@param {string} [namespace] - The cache of the namespace that will be cleared. If empty all caches will be cleared
	 *	@private
	 *	@return {Promise}
	 */

	reset(namespace) {
		return this.clean(namespace, 'reset');
	}
}

module.exports = new CacheManager();
