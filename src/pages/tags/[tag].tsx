import { slug } from 'github-slugger'

import { allBlogs } from 'contentlayer/generated'
import metadata from 'data/metadata'
import type { Blog } from 'contentlayer/generated'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { TagSEO } from '@/components/SEO'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, getAllTags } from '@/lib/utils/contentlayer'

import type { CoreContent } from '@/lib/utils/contentlayer'

export const getStaticPaths: GetStaticPaths<{ tag: string }> = async () => {
  const tags = await getAllTags(allBlogs)

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  {
    posts: CoreContent<Blog>[]
    tag: string
  },
  {
    tag: string
  }
> = async (context) => {
  const tag = context.params!.tag
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) =>
        post.draft !== true && post.tags?.map((t) => slug(t)).includes(tag),
    ),
  )

  return { props: { posts: filteredPosts, tag } }
}

export default function Tag({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${metadata.title}`}
        description={`${tag} tags - ${metadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
