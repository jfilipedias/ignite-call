import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa de no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  notes: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  scheduleDateTime: Date
  onResetScheduleDateTime: () => void
}

export function ConfirmStep({
  scheduleDateTime,
  onResetScheduleDateTime,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  const formattedDate = dayjs(scheduleDateTime).format('DD[ de ]MMMM[ de ]YYYY')
  const formattedHour = dayjs(scheduleDateTime).format('HH:mm')

  async function handleConfirmSchedule(data: ConfirmFormData) {
    const { name, email, notes } = data
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      notes,
      date: scheduleDateTime,
    })

    onResetScheduleDateTime()
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmSchedule)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {formattedDate}
        </Text>
        <Text>
          <Clock />
          {formattedHour}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="exemplo@email.com"
          {...register('email')}
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('notes')} />
      </label>

      <FormActions>
        <Button
          type="button"
          variant="tertiary"
          onClick={onResetScheduleDateTime}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
