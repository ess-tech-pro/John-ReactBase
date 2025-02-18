import type { UserConfig } from 'vite'
import type { RollupAliasOptions } from '@rollup/plugin-alias'
import NormalSplitChunks from './plugins/NormalSplitChunks'

export default (): UserConfig => {
	return {
		// NOTE - If you want to use Regex please use /...\/([^/]+)/ to split chunks right way
		plugins: [
			NormalSplitChunks([
				/node_modules\/([^/]+)/,
				/utils\/([^/]+)/,
				/hooks\/([^/]+)/,
				/store\/([^/]+)/,
				/routes\/([^/]+)/,
			]),
		],
	}
}

export const aliasExternal: RollupAliasOptions = {}
