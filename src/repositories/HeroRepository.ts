import { writeFile, readFile } from 'node:fs/promises'
import { HeroEntity } from '../entities/HeroEntity'

type DatabaseHero = {
  id: string
  name: string
  age: number
  power: string
}

type DatabaseHeroes = DatabaseHero[]

type HeroRepositoryArguments = {
  file: string
}

export class HeroRepository {
  file: string

  constructor({ file }: HeroRepositoryArguments) {
    this.file = file
  }

  private async currentFileContent() {
    const currentFile = await readFile(this.file)

    return JSON.parse(`${currentFile}`) as DatabaseHeroes
  }

  find() {
    return this.currentFileContent()
  }

  async create(hero: HeroEntity) {
    const currentFile = await this.currentFileContent()

    currentFile.push(hero)

    await writeFile(this.file, JSON.stringify(currentFile))

    return hero.id
  }
}
