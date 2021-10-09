import { game } from '../core/game';

export const PLAYER_RADIUS = 12;
export const PLAYER_COLOR = '#91e1ff';
export const PLAYER_GUN_RADIUS = 5;
export const PLAYER_GUN_COLOR = '#ff8484';

export interface PlayerProps {
    gunRotation: {
        sin: number;
        cos: number;
    };
}

export const player = ({ gunRotation: { sin, cos } }: PlayerProps) => {
    game.context.beginPath();
    game.context.arc(
        game.center.x,
        game.center.y,
        PLAYER_RADIUS,
        0,
        2 * Math.PI,
        false,
    );
    game.context.fillStyle = PLAYER_COLOR;
    game.context.fill();

    game.context.beginPath();
    game.context.arc(
        game.center.x + cos * PLAYER_RADIUS,
        game.center.y + sin * PLAYER_RADIUS,
        PLAYER_GUN_RADIUS,
        0,
        2 * Math.PI,
        false,
    );
    game.context.fillStyle = PLAYER_GUN_COLOR;
    game.context.fill();
};
