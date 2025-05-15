import { Game } from './game'
import './style.css'

const game = new Game(['circle', 'rectangle', 'square'])

game.render('#app')
game.start()
