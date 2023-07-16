import { allBlogs } from 'contentlayer/generated'
import metadata from 'data/metadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'

import type { InferGetStaticPropsType } from 'next'

export const POSTS_PER_PAGE = 5

export const getStaticProps = async () => {
  const posts = sortedBlogPost(allBlogs)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
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

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Blog - ${metadata.author}`}
        description={metadata.description}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title='All Posts'
      />
    </>
  )
}
