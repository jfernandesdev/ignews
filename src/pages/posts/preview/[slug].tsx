import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from 'next-auth/react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { motion } from 'framer-motion';

import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss';

interface PostPreviewProps {
 post: {
   slug: string;
   title: string;
   content: string;
   updateAt: string;
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
      staggerChildren: .12
    },
  },
}

export default function PostPreview({ post }:PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])
  
  return(
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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{__html: post.content}} 
          />

          <motion.div 
            variants={fadeUp}
            className={styles.continueReading}
          > 
            <span>Wanna continue reading?</span>
            <Link href="/">
              <a>Subscribe now</a>
            </Link>
            🤗
          </motion.div>
        </motion.article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID<any>('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.slice(0, 2)),
    updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  };

  return {
    props: {
      post
    },
    revalidate: 60 * 30 // 30 minutes
  }
}