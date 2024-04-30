/**
 * Rollup 설정 모듈
 *
 * @author OHTAEKWON
 * @since 2024.04.30 Tue 10:01:31
 */
import pkg from "./package.json" assert { type: "json" };
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import image from "@rollup/plugin-image";
import postcssPrefixer from "postcss-prefixer";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const extensions = [".js", ".jsx", ".ts", ".tsx", ".scss"];

export default {
  input: "./index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      preserveModulesRoot: "src",
      globals: {
        react: "React",
        "react/jsx-runtime": "jsxRuntime",
      },
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    {
      name: pkg.name,
      file: pkg.browser,
      format: "umd",
      globals: {
        react: "React",
      },
    },
  ],
  watch: {
    include: "*",
    exclude: "node_modules/**",
  },
  preserveModules: true,
  plugins: [
    nodeResolve({ extensions }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
    peerDepsExternal(),
    json(),
    image(),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extract: true,
      modules: true,
      use: ["sass"],
      plugins: [postcssPrefixer({ prefix: `${pkg.name}__` })],
    }),
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
};
