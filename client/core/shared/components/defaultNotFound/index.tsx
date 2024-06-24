import { Wrapper, Text } from './styled'
import { useRouter } from 'next/router'

export const DefaultNotFound = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <Text>4 0 4</Text>
      <div style={{ marginTop: 12 }}>Страница не найдена</div>
      <button onClick={() => router.push('/')}>В начало</button>
    </Wrapper>
  )
}
