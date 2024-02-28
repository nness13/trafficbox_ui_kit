import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from "rollup-plugin-postcss";


export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: 'dist/index.esm.js',
			format: 'esm',
			sourcemap: true,
		},
	],
	plugins: [
		nodeResolve(),
		commonjs(),
		typescript(),
		postcss({
			config: {
				path: "./postcss.config.js",
			},
			extensions: [".css"],
			minimize: true,
			inject: {
				insertAt: "top",
			},
		}),
	],
	external: ['react', 'react-dom'],
};