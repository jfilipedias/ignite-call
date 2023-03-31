import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ShieldCheckered } from 'phosphor-react'

const scheduleBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  notes: z.string(),
  date: z.string().datetime(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { name, email, notes, date } = scheduleBodySchema.parse(req.body)

  const scheduleDate = dayjs(date).startOf('hour')

  if (scheduleDate.isBefore(new Date())) {
    return res.status(400).json({ message: 'Date is already passed.' })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exists.' })
  }

  const scheduleDateTime = scheduleDate.toDate()

  const conflictingSchedule = await prisma.schedule.findFirst({
    where: {
      user_id: user.id,
      date: scheduleDate.toDate(),
    },
  })

  if (conflictingSchedule) {
    return res
      .status(400)
      .json({ message: 'This time has already been scheduled.' })
  }

  await prisma.schedule.create({
    data: {
      name,
      email,
      notes,
      date: scheduleDateTime,
      user_id: user.id,
    },
  })

  res.status(201).end()
}
