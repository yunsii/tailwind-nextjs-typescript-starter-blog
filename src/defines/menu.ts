export interface MenuItem {
  href: string
  title: string
}

export function defineMenu(items: MenuItem[]) {
  return items
}
