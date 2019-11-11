// document.querySelector('body').innerHTML = '<h1 id="title">Welcome to Flappy Fly!</h1>';
import { FlappyFlyGame } from './FlappyFlyGame.class';

const flappyFlyGame = FlappyFlyGame.getInstance(document.body);
flappyFlyGame.render();
