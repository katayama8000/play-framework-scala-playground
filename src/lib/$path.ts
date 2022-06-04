export const pagesPath = {
  "dashboard": {
    $url: (url?: { hash?: string }) => ({ pathname: '/dashboard' as const, hash: url?.hash })
  },
  "test": {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash })
  },
  "tomorrowtask": {
    $url: (url?: { hash?: string }) => ({ pathname: '/tomorrowtask' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
