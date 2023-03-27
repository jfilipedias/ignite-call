import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
  display: 'grid',
  position: 'relative',
  maxWidth: '100%',
  margin: '$6 auto 0',
  padding: 0,

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        gridTemplateColumns: '1fr',
        width: 540,
      },
    },
  },
})

export const TimePicker = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,
  padding: '$6 $6 0',
  overflowY: 'scroll',
  borderLeft: '1px solid $gray600',
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',

  span: {
    color: '$gray200',
    textTransform: 'lowercase',
  },
})

export const TimePickerList = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
  marginTop: '$3',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '2fr',
  },
})

export const TimePickerItem = styled('button', {
  background: '$gray600',
  border: 0,
  borderRadius: '$sm',
  padding: '$2',
  color: '$gray100',
  fontSize: '$sm',
  lineHeight: '$base',
  cursor: 'pointer',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    opacity: 0.4,
    cursor: 'default',
  },

  '&:(&:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
