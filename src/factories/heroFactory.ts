import { HeroRepository } from '../repositories/HeroRepository'
import { HeroService } from '../service/HeroService'

type GenerateInstanceArguments = {
  filePath: string
}

export const generateInstance = ({ filePath }: GenerateInstanceArguments) => {
  const heroRepository = new HeroRepository({ file: filePath })
  const heroService = new HeroService({ heroRepository })

  return heroService
}
