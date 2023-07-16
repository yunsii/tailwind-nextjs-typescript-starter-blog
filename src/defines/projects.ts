export interface ProjectItem {
  title: string
  description: string
  imgSrc: string
  href: string
}

export function defineProjects(projects: ProjectItem[]) {
  return projects
}
