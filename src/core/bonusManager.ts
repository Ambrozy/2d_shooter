const bonusContainerElement = document.getElementsByClassName('bonuses')[0];

export const SPEED_BONUS = 'SPEED_BONUS';
export const EXP_SPEED_BONUS = 'EXP_SPEED_BONUS';
export const FREEZE_BONUS = 'FREEZE_BONUS';
export const UNTOUCHABLE_BONUS = 'UNTOUCHABLE_BONUS';
export const TELEKINESIS_BONUS = 'TELEKINESIS_BONUS';
export const BONUS_ACTION_TIME = 10000; // 10 seconds
export const FREEZE_BORDER_COLOR = '#5791d3';
export const UNTOUCHABLE_BORDER_COLOR = '#ffbc00';

export type TemporaryBonusNames =
    | typeof SPEED_BONUS
    | typeof EXP_SPEED_BONUS
    | typeof FREEZE_BONUS
    | typeof UNTOUCHABLE_BONUS
    | typeof TELEKINESIS_BONUS;

export interface BonusState {
    actionTime: number;
    timeLimit: number;
    value: number;
    bonusBar: HTMLDivElement;
    bonusWrapper: HTMLDivElement;
}

export interface BonusManger {
    bonuses: Record<TemporaryBonusNames, BonusState> | {};
    reset: () => void;
    addBonus: (
        bonusName: TemporaryBonusNames,
        value?: number,
        timeLimit?: number,
    ) => void;
    updateBonus: (bonusName: TemporaryBonusNames) => void;
    removeBonus: (bonusName: TemporaryBonusNames) => void;
    render: (deltaMilliseconds: number) => void;
}

const displayNames: Record<TemporaryBonusNames, string> = {
    [SPEED_BONUS]: 'Speed x2',
    [EXP_SPEED_BONUS]: 'Experience x2',
    [FREEZE_BONUS]: 'Freeze',
    [UNTOUCHABLE_BONUS]: 'No damage',
    [TELEKINESIS_BONUS]: 'Telekinesis',
};

export const bonusManager: BonusManger = {
    bonuses: {},
    reset() {
        this.bonuses = {};
        bonusContainerElement.innerHTML = '';
    },
    addBonus(
        bonusName: TemporaryBonusNames,
        value = 1,
        timeLimit = BONUS_ACTION_TIME,
    ) {
        if (this.bonuses[bonusName]) {
            this.bonuses[bonusName].actionTime = 0;
            this.bonuses[bonusName].timeLimit = timeLimit;
            this.bonuses[bonusName].value = value;
            return;
        }

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

        this.bonuses[bonusName] = {
            actionTime: 0,
            timeLimit,
            value,
            bonusBar,
            bonusWrapper,
        };
    },
    updateBonus(bonusName: TemporaryBonusNames) {
        const bonusState: BonusState = this.bonuses[bonusName];
        const expiredWidth =
            (100 * bonusState.actionTime) / bonusState.timeLimit;

        bonusState.bonusBar.style.transform = `translateX(-${expiredWidth}%)`;
    },
    removeBonus(bonusName: TemporaryBonusNames) {
        bonusContainerElement.removeChild(this.bonuses[bonusName].bonusWrapper);
        delete this.bonuses[bonusName];
    },
    render(deltaMilliseconds: number) {
        Object.keys(this.bonuses).forEach((bonusName: TemporaryBonusNames) => {
            this.bonuses[bonusName].actionTime += deltaMilliseconds;
            this.updateBonus(bonusName);

            if (
                this.bonuses[bonusName].actionTime >=
                this.bonuses[bonusName].timeLimit
            ) {
                this.removeBonus(bonusName);
            }
        });
    },
};
