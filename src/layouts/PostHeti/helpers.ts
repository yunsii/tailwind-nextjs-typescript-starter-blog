export async function autoSpacing() {
  const Heti = (await import('heti/js/heti-addon')).default
  const heti = new Heti('.heti')
  heti.autoSpacing() // 自动进行中西文混排美化和标点挤压

  return Promise.resolve()
}
