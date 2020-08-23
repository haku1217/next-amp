import { FC } from 'react'

type Props = {
  posts: {
    link: string
    title: string
    date: string
  }[]
}

const BlogList: FC<Props> = ({ posts }) => (
  <>
    <h1>ブログ一覧</h1>
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          {post.date} <a href={post.link}>{post.title}</a>
        </li>
      ))}
    </ul>
    <style jsx>
      {`
        div {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
    </style>
  </>
)
export default BlogList
