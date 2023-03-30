import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useQuery } from '@tanstack/react-query'
import { getWeekDays } from '@/utils/get-week-days'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { api } from '../../lib/axios'

interface CalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

type CalendarWeeks = CalendarWeek[]

interface BlockedWeekDays {
  blockedWeekDays: number[]
}

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const router = useRouter()
  const username = String(router.query.username)

  const currentFullMonth = currentDate.format('MMMM')
  const currentMonth = currentDate.get('month')
  const currentYear = currentDate.get('year')

  const { data } = useQuery<BlockedWeekDays>(
    ['users', username, 'blocked-date', selectedDate],
    async () => {
      const response = await api.get(`/users/${username}/blocked-week-days`, {
        params: {
          year: currentYear,
          month: currentMonth,
        },
      })

      return response.data
    },
  )

  const calendarWeeks = useMemo(() => {
    const currentMonthDaysArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => currentDate.set('date', i + 1))

    const firstWeekDayInCurrentMonth = currentDate.get('day')

    const previousMonthDaysFillArray = Array.from({
      length: firstWeekDayInCurrentMonth,
    })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDayInCurrentMonth = lastDayInCurrentMonth.get('day')

    const nextMonthDaysFillArray = Array.from({
      length: 6 - lastWeekDayInCurrentMonth,
    }).map((_, i) => lastDayInCurrentMonth.add(i + 1, 'day'))

    const calendarDays = [
      ...previousMonthDaysFillArray.map((date) => ({
        date,
        disabled: true,
      })),
      ...currentMonthDaysArray.map((date) => ({
        date,
        disabled:
          date.endOf('day').isBefore(new Date()) ||
          !!data?.blockedWeekDays.includes(date.get('day')),
      })),
      ...nextMonthDaysFillArray.map((date) => ({
        date,
        disabled: true,
      })),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const startedNewWeek = i % 7 === 0

        if (startedNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, data])

  const shortWeekDays = getWeekDays({ short: true })

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentFullMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Mês anterior">
            <CaretLeft />
          </button>

          <button onClick={handleNextMonth} title="Próximo mês">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay
                    onClick={() => onDateSelected(date.toDate())}
                    disabled={disabled}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
