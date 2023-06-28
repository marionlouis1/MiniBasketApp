import React from 'react'
import { Image } from 'react-native';
import {  BALL_SIZE } from '../Constants';

function Ball ({body, image}) {
    const width = BALL_SIZE;
    const height = BALL_SIZE;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;
    return (
        <Image
            source={image}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
            }}
        />
    );
}

export default Ball;