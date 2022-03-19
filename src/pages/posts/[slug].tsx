import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { RichText } from 'prismic-dom'
import { motion } from 'framer-motion'

import { getPrismicClient } from '../../services/prismic'

import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string
    title: string
    content: string
    updateAt: string
  }
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
      staggerChildren: 0.12
    }
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | IgNews</title>
      </Head>

      <main className={styles.container}>
        <motion.article 
          className={styles.post}
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h1 variants={fadeUp}>{post.title}</motion.h1>
          <motion.time variants={fadeUp}>{post.updateAt}</motion.time>

          <motion.div
            variants={fadeUp}
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req })
  const { slug } = params

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID<any>('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updateAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  }

  return {
    props: {
      post,
    },
  }
}
