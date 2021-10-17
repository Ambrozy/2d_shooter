export const forEachKeys = <T extends string>(
    obj: Partial<Record<T, unknown>>,
    forEach: (name: T, index: number) => void,
) => {
    Object.keys(obj).forEach(forEach);
};
