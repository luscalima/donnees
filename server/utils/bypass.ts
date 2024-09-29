export function bypass(path: string, routes: (string | RegExp)[]): boolean {
  return routes.some(route =>
    typeof route === 'string' ? route === path : route.test(path),
  )
}
