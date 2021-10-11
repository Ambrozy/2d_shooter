import { game } from '../core/game';

const statisticElement = document.getElementById('statistic');
const scoreElement = document.getElementsByClassName('score')[0];
const ammunitionElement = document.getElementsByClassName('ammunition')[0];
const healthElement = document.getElementsByClassName('health-left')[0];

export const updateScore = (deltaScore: number) => {
    game.score += deltaScore;
    scoreElement.innerHTML = `Score: ${game.score}`;
};

export const updateAmmo = (deltaAmmunition: number) => {
    game.ammunition += deltaAmmunition;
    ammunitionElement.innerHTML = `Ammunition: ${game.ammunition}`;
};

export const updateHealth = (deltaHealth: number) => {
    game.health += deltaHealth;
    game.health = Math.min(game.health, 100);
    (healthElement as HTMLElement).style.width = `${game.health}%`;
};

export const hideStatistics = () => {
    statisticElement.style.display = 'none';
};
export const showStatistics = () => {
    statisticElement.style.display = 'block';
};
