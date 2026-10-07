// content/ 以下の YAML（1件1ファイル）を読み込む共通処理。
// ファイル名（拡張子なし）がそのまま ID になる。

export function loadEntries<T>(modules: Record<string, T>): (T & { id: string })[] {
  return Object.entries(modules).map(([path, data]) => ({
    ...data,
    id: path.slice(path.lastIndexOf('/') + 1, -'.yaml'.length),
  }))
}

/** public/ 以下の画像パスを、公開先のベース URL を考慮した URL にする */
export function assetUrl(path?: string): string | undefined {
  if (!path) return undefined
  return /^https?:\/\//.test(path) ? path : import.meta.env.BASE_URL + path.replace(/^\//, '')
}
