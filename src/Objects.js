import Matter from "matter-js";
import { BALL_SIZE, DEVICE_WIDTH, DEVICE_HEIGHT, TARGET_SIZE } from "./Constants";
import randomInt from "random-int";

export const ball = Matter.Bodies.circle(
    randomInt(0, 100),
    randomInt(0, 100),
    BALL_SIZE,
    {
        frictionAir: 0.021,
        friction: 0.1,
        restitution: 0.8,
        label: "ball",
    },
);

export const cible = Matter.Bodies.circle(
    DEVICE_WIDTH/2- TARGET_SIZE,
    0.9*DEVICE_HEIGHT,
    TARGET_SIZE,
    {
        restitution: 0.8,
        label: "cible",
        isStatic: true,
    },
);
