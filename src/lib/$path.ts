export const pagesPath = {
  "dashboard": {
    $url: (url?: { hash?: string }) => ({ pathname: '/dashboard' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
