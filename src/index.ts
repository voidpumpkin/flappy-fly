// document.querySelector('body').innerHTML = '<h1 id="title">Welcome to Flappy Fly!</h1>';
import { GameBoard } from './GameBoard.class';
import { Fly } from './Fly.class';

const gameBoard = new GameBoard();
const fly = new Fly();

//TODO: Refactor
let toggle = true;
setInterval(() => {
    const valueEnum = {
        true: 'flyingZoneBackgroundImage1',
        false: 'flyingZoneBackgroundImage2'
    };
    const el = document.querySelector('#flying-zone');
    el.classList.remove(valueEnum[toggle.toString()]);
    toggle = !toggle;
    el.classList.add(valueEnum[toggle.toString()]);
}, 500);

// gameBoard.render(document.body);
// fly.render(gameBoard.htmlElemnt);
