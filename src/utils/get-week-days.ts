interface GetWeekDaysOptions {
  short?: boolean
}

export function getWeekDays(options?: GetWeekDaysOptions) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (options?.short) {
        return weekDay.substring(0, 3).toUpperCase()
      }

      return weekDay
    })
}
