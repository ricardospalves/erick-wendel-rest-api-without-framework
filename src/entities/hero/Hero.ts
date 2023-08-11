import { randomUUID } from 'node:crypto'

type HeroConstructor = {
  name: string
  age: number
  power: string
}

export class Hero {
  name: string
  age: number
  power: string

  constructor({ age, name, power }: HeroConstructor) {
    this.name = name
    this.age = age
    this.power = power
  }

  get id() {
    return randomUUID()
  }
}
