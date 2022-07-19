import { GetStaticProps } from 'next'
import Head from 'next/head'
import { motion } from 'framer-motion'

import { SubscribeButton } from '../components/SubscribeButton'

import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string
    amount: string
  }
}

const fadeUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export default function Home({ product }: HomeProps) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      variants={stagger}
      initial='initial'
      animate='animate'
    >
      <Head>
        <title>Home | ig.News</title>
      </Head>

      <main className={styles.contentContainer}>
        <motion.section className={styles.hero}>
          <motion.span variants={fadeUp}>👏 Hey, welcome</motion.span>
          <motion.h1 variants={fadeUp}>
            News about <br />
            the <span>React</span> world.
          </motion.h1>
          <motion.p variants={fadeUp}>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </motion.p>

          <motion.div variants={fadeUp}>
            <SubscribeButton />
          </motion.div>
        </motion.section>

        <img 
          className={styles.imgGirlHome}
          src='/images/avatar.svg' 
          alt='Girl coding' 
        />
      </main>
    </motion.div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KcIShLTxKemwZChhV99tOTW')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}
