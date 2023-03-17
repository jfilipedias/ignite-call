import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { prisma } from '@/lib/prisma'

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'Username already taken.',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  setCookie(
    {
      res,
    },
    '@ignite-call:userId',
    user.id,
    {
      maxAge: SEVEN_DAYS_IN_SECONDS,
      path: '/',
    },
  )

  return res.status(201).json(user)
}
