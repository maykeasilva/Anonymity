export function generateSlug(body: string) {
  return body 
  .normalize('NFD')
  .toLowerCase()
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^\w\s-]/g, '')
  .replace(/[-_]*/g, '')
  .replace(/\s+/g, '-')
}
