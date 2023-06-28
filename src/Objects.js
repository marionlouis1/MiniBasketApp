import Matter from "matter-js";
import { BALL_SIZE } from "./Constants";
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
