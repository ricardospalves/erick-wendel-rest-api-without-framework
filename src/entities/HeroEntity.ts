import { randomUUID } from 'node:crypto'

type HeroEntityConstructor = {
  name: string
  age: number
  power: string
}

export class HeroEntity {
  name: string
  age: number
  power: string
  readonly id: string

  constructor({ age, name, power }: HeroEntityConstructor) {
    this.id = randomUUID()
    this.name = name
    this.age = age
    this.power = power
  }
}
