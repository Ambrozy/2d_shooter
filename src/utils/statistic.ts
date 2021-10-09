import { game } from '../core/game';

const scoreElement = document.getElementsByClassName('score')[0];
const ammunitionElement = document.getElementsByClassName('ammunition')[0];
const healthElement = document.getElementsByClassName('health-left')[0];

export const updateScore = (deltaScore: number) => {
    game.score += deltaScore;
    scoreElement.innerHTML = `Score: ${game.score}`;
};

export const updateAmmo = (deltaAmmunition: number) => {
    game.ammunition -= deltaAmmunition;
    ammunitionElement.innerHTML = `Ammunition: ${game.ammunition}`;
};

export const updateHealth = (deltaHealth: number) => {
    game.health -= deltaHealth;
    (healthElement as HTMLElement).style.width = `${game.health}%`;
};
