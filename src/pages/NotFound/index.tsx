import { Container } from '../../components/Container'
import { MainTemplate } from '../../templates/MainTemplate'

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <h1>Page Not Found</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptatibus, cum, magnam soluta voluptas autem dicta delectus
          voluptates placeat nemo ipsa perspiciatis, corporis alias quia iusto
          at sed eius perferendis culpa?
        </p>
      </Container>
    </MainTemplate>
  )
}
