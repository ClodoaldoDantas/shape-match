import { shuffle } from './utils/shuffle'

export class Game {
  constructor(shapes) {
    this.shapes = shapes
    this.score = 0

    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
  }

  updateBoard(dropzone, shapeId) {
    document.getElementById(shapeId).classList.add('hidden')
    dropzone.classList.add('dropped')
    dropzone.style.backgroundColor = `var(--shape-${shapeId})`
  }

  updateScore() {
    this.score++

    const scoreElement = document.getElementById('score')
    scoreElement.textContent = `Pontuação: ${this.score}`

    if (this.score === this.shapes.length) {
      scoreElement.textContent = '🎉 Parabéns! Você venceu!'
    }
  }

  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id)
  }

  handleDrop(event) {
    event.preventDefault()

    const dropzone = event.target
    const shapeId = event.dataTransfer.getData('text/plain')
    const expectedShape = dropzone.dataset.shape

    if (shapeId === expectedShape) {
      this.updateScore()
      this.updateBoard(dropzone, shapeId)
    }
  }

  start() {
    const shapes = document.querySelectorAll('.shape')
    const dropzones = document.querySelectorAll('.dropzone')

    shapes.forEach((shape) => {
      shape.addEventListener('dragstart', this.handleDragStart)
    })

    dropzones.forEach((dropzone) => {
      dropzone.addEventListener('dragover', (event) => event.preventDefault())
      dropzone.addEventListener('drop', this.handleDrop)
    })
  }

  render(elementId) {
    const app = document.querySelector(elementId)

    const dropzones = shuffle([...this.shapes])
      .map((shape) => `<div class="dropzone" data-shape="${shape}"></div>`)
      .join('')

    const draggableShapes = this.shapes
      .map((shape) => {
        return `<div id="${shape}" draggable="true" class="shape"></div>`
      })
      .join('')

    app.innerHTML = `
      <p id="score" class="score-text">
        Pontuação: ${this.score}
      </p>

      <div class="row">
        ${dropzones}
      </div>

      <div class="row">
        ${draggableShapes}
      </div>
    `
  }
}
