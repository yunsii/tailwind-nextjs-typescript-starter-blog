import { allBlogs } from 'contentlayer/generated'
import metadata from 'data/metadata'

import type { Blog } from 'contentlayer/generated'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import type { CoreContent } from '@/lib/utils/contentlayer'

import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import { PageSEO } from '@/components/SEO'
import { POSTS_PER_PAGE } from '@/constants/settings'

// eslint-disable-next-line react-refresh/only-export-components
export const getStaticPaths: GetStaticPaths<{
  page: string
}> = async () => {
  const totalPosts = allBlogs
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const getStaticProps: GetStaticProps<
  {
    initialDisplayPosts: CoreContent<Blog>[]
    posts: CoreContent<Blog>[]
    pagination: {
      currentPage: number
      totalPages: number
    }
  },
  { page: string }
> = async (context) => {
  const page = context.params!.page
  const posts = sortedBlogPost(allBlogs)
  const pageNumber = Number.parseInt(page, 10)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      posts: allCoreContent(posts),
      pagination,
    },
  }
}

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={metadata.title} description={metadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title='All Posts'
      />
    </>
  )
}
