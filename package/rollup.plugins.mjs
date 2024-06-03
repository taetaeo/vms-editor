import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-replace";
import cssimport from "postcss-import";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import alias from "@rollup/plugin-alias";
import postcssPrefixer from "postcss-prefixer";
import uglify from "rollup-plugin-uglify";
import autoprefixer from "autoprefixer";
import filesize from "rollup-plugin-filesize";
import postcss from "rollup-plugin-postcss";
import path from "path";

const __dirname = path.resolve();

export function getPlugins(extensions, pkg) {
  return [
    nodeResolve({ extensions }),
    peerDepsExternal(),
    postcss({
      extract: "css/vms-editor.css",
      modules: false,
      sourceMap: true,
      use: ["sass"],
      plugins: [postcssPrefixer({ prefix: `${pkg.name}__` }), cssimport(), autoprefixer()],
    }),
    babel({
      babelHelpers: "bundled",
      include: ["src/**/*"],
      exclude: "node_modules/**",
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),

    json(),
    image(),
    commonjs(),
    // typescript({ useTsconfigDeclarationDir: true }),
    typescript({ tsconfig: "./tsconfig.json" }),
    alias({
      resolve: [".ts", ".tsx"],
      entries: [{ find: "@/", replacement: path.resolve(__dirname, "./dist/src/") }],
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    process.env.NODE_ENV === "production" && uglify(),
    terser({ maxWorkers: 4 }),
    filesize(),
  ];
}

export function getOutputOptions(pkg) {
  const globals = {
    react: "React",
    "react-dom": "ReactDOM",
    "react/jsx-runtime": "jsxRuntime",
  };

  return [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
      preserveModulesRoot: "src",
      globals,
    },
    {
      format: "esm",
      file: pkg.module,
      sourcemap: true,
    },
    {
      format: "umd",
      file: pkg.browser,
      name: pkg.name,
      globals,
    },
  ];
}
