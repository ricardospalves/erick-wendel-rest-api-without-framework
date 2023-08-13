import { HeroEntity } from '../entities/HeroEntity'
import { HeroRepository } from '../repositories/HeroRepository'

type HeroServiceArguments = {
  heroRepository: HeroRepository
}

export class HeroService {
  heroRepository: HeroRepository

  constructor({ heroRepository }: HeroServiceArguments) {
    this.heroRepository = heroRepository
  }

  find() {
    return this.heroRepository.find()
  }

  create(heroEntity: HeroEntity) {
    return this.heroRepository.create(heroEntity)
  }
}
