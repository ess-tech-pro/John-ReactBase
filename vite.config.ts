import alias from "@rollup/plugin-alias";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import fs from "fs";
import { fileURLToPath } from "node:url";
import path from "path";
import tailwind from "tailwindcss";
import tailwindNesting from "tailwindcss/nesting";
import AutoImport from "unplugin-auto-import/vite";
import { ConfigEnv, defineConfig } from "vite";
import ViteDevelopmentConfig from "./configs/vite.development.config";
import viteProductionConfig, {
  aliasExternal,
} from "./configs/vite.production.config";

const resolve = resolveTsconfigPathsToAlias();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const ViteConfigWithMode = getViteConfigWithMode(mode);
  const config = ViteConfigWithMode?.();

  return {
    publicDir: "src/assets/static",
    plugins: [
      react(),
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.md$/, // .md
        ],
        imports: [
          "react",
          {
            react: [
              ["*", "React"],
              "Suspense",
              "componentDidCatch",
              "StrictMode",
              "createContext",
            ],
          },
          {
            from: "react",
            imports: [
              "Dispatch",
              "SetStateAction",
              "HTMLProps",
              "HTMLAttributes",
              "ComponentType",
              "ReactNode",
            ],
            type: true,
          },
          {
            "react-dom/client": ["createRoot"],
          },
          "react-router-dom",
          {
            "react-router-dom": [
              "createBrowserRouter",
              "RouterProvider",
              "BrowserRouter",
              "useMatches",
              "generatePath",
            ],
          },
        ],
        dts: "./configs/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "./configs/.eslintrc-auto-import.json",
        },
      }),
      ...(mode === "development"
        ? [
            alias({
              entries: aliasExternal.entries || {},
            }),
          ]
        : []),
      ...(config?.plugins ?? []),
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer,
          (tailwindNesting as () => any)(),
          tailwind("./tailwind.config.js"),
        ],
      },
    },
    resolve: {
      alias: {
        ...resolve.alias,
        ...aliasExternal.entries,
      },
    },
    optimizeDeps: {
      ...(mode === "production"
        ? {
            exclude: Object.keys(aliasExternal.entries || {}),
          }
        : {}),
    },
    build: {
      assetsDir: "",
      rollupOptions: {
        output: {
          chunkFileNames() {
            return `[name].[hash].js`;
          },
        },
      },
      minify: "terser",
      terserOptions: {
        format: {
          comments: false, // It will drop all the console.log statements from the final production build
        },
        compress: {
          drop_console: true, // It will stop showing any console.log statement in dev tools. Make it false if you want to see consoles in production mode.
        },
      },
    },
  };
});

const getViteConfigWithMode = (mode: ConfigEnv["mode"]) => {
  if (!mode) return;

  return mode === "development" ? ViteDevelopmentConfig : viteProductionConfig;
}; // getViteConfigFilePathWithMode(mode?: 'development' | 'production')

function resolveTsconfigPathsToAlias(tsconfigPath = "tsconfig.app.json") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // const tsconfig = require(tsconfigPath)
  // const { paths, baseUrl } = tsconfig.compilerOptions
  // NOTE - Get json content without comment line (ignore error JSON parse some string have unexpected symbol)
  // https://stackoverflow.com/questions/40685262/read-json-file-ignoring-custom-comments
  const tsconfig = JSON.parse(
    fs
      .readFileSync(path.resolve(".", tsconfigPath))
      ?.toString()
      .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
        g ? "" : m
      )
  );

  const { paths, baseUrl } = tsconfig.compilerOptions;

  const modules = [path.resolve(__dirname, baseUrl)];

  const alias = Object.fromEntries(
    Object.entries(paths)
      .filter(([, pathValues]) => (pathValues as Array<string>).length > 0)
      .map(([pathKey, pathValues]) => {
        const key = pathKey.replace("/*", "");
        const value = path.resolve(
          __dirname,
          baseUrl,
          (pathValues as Array<string>)[0].replace(/[\/|\*]+(?:$)/g, "")
        );
        modules.push(value);
        return [key, value];
      })
  );

  return {
    alias: {
      src: path.resolve(__dirname, baseUrl),
      ...alias,
    },
    modules,
  };
} // resolveTsconfigPathsToAlias()
