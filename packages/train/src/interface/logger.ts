const loggerWrapper = document.getElementsByClassName('logger')[0];

type logArgs = string | number | object;

const log = (logLevel: 'log' | 'warning' | 'error', ...args: logArgs[]) => {
    const logElement = document.createElement('div');
    const strArgs = args.map((arg) =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg),
    );

    logElement.classList.add('log-item');
    logElement.classList.add(logLevel);
    logElement.innerHTML = strArgs.join(' ');
    loggerWrapper.appendChild(logElement);
};

export const logger = {
    log: (...args: logArgs[]) => log('log', ...args),
    warn: (...args: logArgs[]) => log('warning', ...args),
    error: (...args: logArgs[]) => log('error', ...args),
};
