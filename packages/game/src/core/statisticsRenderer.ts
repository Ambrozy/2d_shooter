import { forEachKeys } from '../utils/typed';
import {
    EXP_SPEED_BONUS,
    FREEZE_BONUS,
    SPEED_BONUS,
    TELEKINESIS_BONUS,
    UNTOUCHABLE_BONUS,
    TemporaryBonusNames,
    BonusState,
} from './types';

import './statistic.scss';

interface StatisticsRendererUpdateProps {
    score: number;
    health: number;
    ammunition: number;
    bonuses: Partial<Record<TemporaryBonusNames, BonusState>>;
}

const displayNames: Record<TemporaryBonusNames, string> = {
    [SPEED_BONUS]: 'Speed x2',
    [EXP_SPEED_BONUS]: 'Experience x2',
    [FREEZE_BONUS]: 'Freeze',
    [UNTOUCHABLE_BONUS]: 'No damage',
    [TELEKINESIS_BONUS]: 'Telekinesis',
};

const initialCache: StatisticsRendererUpdateProps = {
    score: Infinity,
    health: Infinity,
    ammunition: Infinity,
    bonuses: {},
};

let statisticElement: HTMLDivElement;
let scoreElement: HTMLDivElement;
let ammunitionElement: HTMLDivElement;
let healthElement: HTMLDivElement;
let bonusContainerElement: HTMLDivElement;
let updateCache: StatisticsRendererUpdateProps;
let bonusElementsMap: Partial<
    Record<
        TemporaryBonusNames,
        {
            bonusBar: HTMLDivElement;
            bonusWrapper: HTMLDivElement;
        }
    >
> = {};

const setUpdateCache = (updateProps: StatisticsRendererUpdateProps) => {
    updateCache = JSON.parse(JSON.stringify(updateProps));
};

const createBonusProgress = (bonusName: TemporaryBonusNames) => {
    const bonusBar = document.createElement('div');
    const bonusNameNode = document.createElement('div');
    const bonusProgress = document.createElement('div');
    const bonusWrapper = document.createElement('div');

    bonusBar.classList.add('progress-bar');
    bonusBar.classList.add('bonus-bar');
    bonusProgress.classList.add('progress');
    bonusProgress.classList.add('bonus');
    bonusProgress.appendChild(bonusBar);

    bonusNameNode.classList.add('bonus-name');
    bonusNameNode.innerText = displayNames[bonusName];
    bonusWrapper.classList.add('bonus-container');
    bonusWrapper.appendChild(bonusNameNode);
    bonusWrapper.appendChild(bonusProgress);
    bonusContainerElement.appendChild(bonusWrapper);

    return { bonusBar, bonusWrapper };
};

const updateBonus = (
    bonusName: TemporaryBonusNames,
    updateProps: StatisticsRendererUpdateProps,
) => {
    const elements = bonusElementsMap[bonusName];
    const bonusState = updateProps.bonuses[bonusName];
    const lastBonusState = updateCache.bonuses[bonusName];
    const expiredWidth = (100 * bonusState.actionTime) / bonusState.timeLimit;
    const lastExpiredWidth =
        (100 * lastBonusState.actionTime) / lastBonusState.timeLimit;

    if (expiredWidth !== lastExpiredWidth) {
        elements.bonusBar.style.transform = `translateX(-${expiredWidth}%)`;
    }
};

const removeBonus = (bonusName: TemporaryBonusNames) => {
    bonusContainerElement.removeChild(bonusElementsMap[bonusName].bonusWrapper);
    delete bonusElementsMap[bonusName];
};

export const statisticsRenderer = {
    constructor(updateProps: StatisticsRendererUpdateProps) {
        const healthWrapperElement = document.createElement('div');

        statisticElement = document.createElement('div');
        healthElement = document.createElement('div');
        scoreElement = document.createElement('div');
        ammunitionElement = document.createElement('div');
        bonusContainerElement = document.createElement('div');

        statisticElement.classList.add('statistic');
        healthWrapperElement.classList.add('health');
        healthWrapperElement.classList.add('progress');
        healthElement.classList.add('health-bar');
        healthElement.classList.add('progress-bar');
        scoreElement.classList.add('score');
        ammunitionElement.classList.add('ammunition');
        bonusContainerElement.classList.add('bonuses');

        healthWrapperElement.appendChild(healthElement);
        statisticElement.appendChild(healthWrapperElement);
        statisticElement.appendChild(scoreElement);
        statisticElement.appendChild(ammunitionElement);
        statisticElement.appendChild(bonusContainerElement);
        document.body.appendChild(statisticElement);

        updateCache = initialCache;
        bonusElementsMap = {};

        this.update(updateProps);
    },
    update(updateProps: StatisticsRendererUpdateProps) {
        if (updateCache.health !== updateProps.health) {
            healthElement.style.transform = `translateX(-${
                100 - updateProps.health
            }%)`;
        }
        if (updateCache.score !== updateProps.score) {
            scoreElement.innerHTML = `Score: ${updateProps.score}`;
        }
        if (updateCache.ammunition !== updateProps.ammunition) {
            ammunitionElement.innerHTML = `Ammunition: ${updateProps.ammunition}`;
        }

        forEachKeys(updateProps.bonuses, (bonusName) => {
            if (!bonusElementsMap[bonusName]) {
                bonusElementsMap[bonusName] = createBonusProgress(bonusName);
            } else {
                updateBonus(bonusName, updateProps);
            }
        });
        forEachKeys(updateCache.bonuses, (bonusName) => {
            if (!updateProps.bonuses[bonusName]) {
                removeBonus(bonusName);
            }
        });

        setUpdateCache(updateProps);
    },
    destructor() {
        document.body.removeChild(statisticElement);
    },
};
