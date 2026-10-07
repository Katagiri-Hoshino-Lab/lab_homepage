import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { parse } from 'yaml'

/** content/ 以下の YAML をビルド時に JS オブジェクトへ変換する */
function yaml(): Plugin {
  return {
    name: 'yaml',
    transform(code, id) {
      if (!id.endsWith('.yaml')) return null
      return { code: `export default ${JSON.stringify(parse(code))}`, map: null }
    },
  }
}

// GitHub Pages（https://<org>.github.io/<repo>/）でも独自ドメインでも動くよう相対パスで出力する。
// ルーティングは HashRouter のため、サーバ側のリライト設定は不要。
export default defineConfig({
  plugins: [react(), tsconfigPaths(), yaml()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
