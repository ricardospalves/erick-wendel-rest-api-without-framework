export class HeroService {
  constructor({ heroRepository }) {
    this.heroRepository = heroRepository
  }

  find() {
    return this.heroRepository.find()
  }

  create(heroEntity) {
    return this.heroRepository.create(heroEntity)
  }
}
