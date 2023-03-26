import { Avatar, Heading, Text } from '@ignite-ui/react'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { prisma } from '@/lib/prisma'
import { Container, UserHeader } from './styles'

const ONE_DAY_IN_SECONDS = 60 * 60 * 24

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        avatarUrl: String(user.avatar_url),
        bio: user.bio,
      },
    },
    revalidate: ONE_DAY_IN_SECONDS,
  }
}

export default function UserSchedule({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>
    </Container>
  )
}
