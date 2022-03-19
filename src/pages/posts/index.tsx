import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Primic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../services/prismic'

import styles from './styles.module.scss'

type Post = {
  slug: string
  title: string
  excerpt: string
  updateAt: string
}

interface PostProps {
  posts: Post[]
}

const fadeUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: .12
    },
  },
}

export default function Posts({ posts }: PostProps) {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>

      <motion.main
        className={styles.container}
        initial='initial'
        animate='animate'
        variants={stagger}
      >
        <div className={styles.postList}>
          {posts.map(post => (
            <Link
              key={post.slug}
              href={
                session?.activeSubscription
                  ? `/posts/${post.slug}`
                  : `/posts/preview/${post.slug}`
              }
            >
              <motion.a variants={fadeUp}>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </motion.a>
            </Link>
          ))}
        </div>
      </motion.main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query<any>(
    [Primic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    }
  )

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      updateAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    }
  })

  return {
    props: {
      posts
    },
  }
}
