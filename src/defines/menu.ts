export interface MenuItem {
  href: string
  title: string
  icon: string
}

export function defineMenu(items: MenuItem[]) {
  return items
}
