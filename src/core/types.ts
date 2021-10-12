export type Point = {
    x: number;
    y: number;
};

export type Circle = Point & {
    radius: number;
};

export type Rotation = {
    cos: number;
    sin: number;
};
