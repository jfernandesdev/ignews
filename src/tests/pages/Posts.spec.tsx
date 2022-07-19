import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'

import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'

jest.mock('next-auth/react', () => {
  return {
    useSession: () => [null, false],
  }
})

jest.mock('../../services/prismic')

const posts = [
  {
    slug: 'fmy-new-post',
    title: 'My New Post',
    excerpt: 'Post excerpt',
    updateAt: '21 de Setembro',
  },
]

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My New Post')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'My New Post' }],
              content: [{ type: 'paragraph', text: 'Post excerpt' }],
            },
            last_publication_date: '09-21-2022',
          },
        ],
      }),
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My New Post',
            excerpt: 'Post excerpt',
            updateAt: '21 de setembro de 2022',
          }],
        },
      }),
    )
  })
})
