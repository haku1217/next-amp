import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const dir = join(process.cwd(), 'src/posts')

export const listContentFiles = () => {
  const filenames = fs.readdirSync(dir)
  return filenames
}

export const readContentFile = async ({ slug }: any) => {
  const raw = fs.readFileSync(join(dir, `${slug}.md`), 'utf-8')
  const matterResult = matter(raw)
  return {
    content: matterResult.content,
    title: matterResult.data.title,
    published: formatDate(matterResult.data.published)
  }
}

const formatDate = (date: unknown) => {
  if (!(date instanceof Date)) {
    return ''
  }
  const year = date.getFullYear()
  const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
  const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
  return `${year}/${month}/${day}`
}
