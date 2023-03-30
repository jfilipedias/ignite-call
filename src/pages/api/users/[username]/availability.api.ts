import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'Date not provided.' })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' })
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.status(204).json({ possibleTimes: [], availability: [] })
  }

  const userTimeInterval = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userTimeInterval) {
    return res.status(204).json({ possibleTimes: [], availability: [] })
  }

  const { start_time_in_minutes, end_time_in_minutes } = userTimeInterval

  const startHour = start_time_in_minutes / 60
  const endHour = end_time_in_minutes / 60

  const possibleTimes = Array.from({
    length: endHour - startHour,
  }).map((_, i) => startHour + i)

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter(
    (time) =>
      !blockedTimes.some((blockedTime) => blockedTime.date.getHours() === time),
  )

  return res.json({ possibleTimes, availableTimes })
}
