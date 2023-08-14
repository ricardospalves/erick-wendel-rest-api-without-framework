import { HeroRepository } from '../repositories/HeroRepository.js'
import { HeroService } from '../service/HeroService.js'

export const generateInstance = ({ filePath }) => {
  const heroRepository = new HeroRepository({ file: filePath })
  const heroService = new HeroService({ heroRepository })

  return heroService
}
