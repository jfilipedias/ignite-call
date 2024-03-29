import { Box, styled, Text } from '@ignite-ui/react'

export const ConnectBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$6',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$2',
  padding: '$4 $6',

  border: '1px solid $gray600',
  borderRadius: '$md',
})

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4',
})
