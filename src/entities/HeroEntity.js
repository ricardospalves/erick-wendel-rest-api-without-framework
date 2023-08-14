import { randomUUID } from 'node:crypto'

export class HeroEntity {
  constructor({ age, name, power }) {
    this.id = randomUUID()
    this.name = name
    this.age = age
    this.power = power
  }
}
