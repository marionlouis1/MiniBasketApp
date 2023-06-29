import React from 'react'
import { Image } from 'react-native';
import {  TARGET_SIZE } from '../Constants';

function Cible ({body, image}) {
    const width = TARGET_SIZE;
    const height = TARGET_SIZE;
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

export default Cible;