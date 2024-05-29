/**
 * Rollup 설정 모듈
 *
 * @author TAETAEO
 * @since 2024.04.26 Fri 17:44:31
 */

import { getPlugins, getOutputOptions } from "./rollup.plugins.mjs";
import pkg from "./package.json" assert { type: "json" };

const extensions = [".js", ".jsx", ".ts", ".tsx", ".scss", ".css", ".sss", ".pcss"];

process.env.BABEL_ENV = "production";

export default {
  input: "./index.ts",
  output: getOutputOptions(pkg),
  assetFileNames: "assets/[name]-[hash][extname]",
  watch: {
    include: "*",
    exclude: "node_modules/**",
  },
  plugins: getPlugins(extensions, pkg),
  external: [...Object.keys(pkg.peerDependencies || {})],
};
