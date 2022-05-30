export const pagesPath = {
  "linkform": {
    $url: (url?: { hash?: string }) => ({ pathname: '/linkform' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
