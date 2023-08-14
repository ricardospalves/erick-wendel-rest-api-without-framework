import { writeFile, readFile } from 'node:fs/promises'

export class HeroRepository {
  constructor({ file }) {
    this.file = file
  }

  async #currentFileContent() {
    const currentFile = await readFile(this.file)

    return JSON.parse(`${currentFile}`)
  }

  find() {
    return this.#currentFileContent()
  }

  async create(hero) {
    const currentFile = await this.#currentFileContent()

    currentFile.push(hero)

    await writeFile(this.file, JSON.stringify(currentFile))

    return hero.id
  }
}
