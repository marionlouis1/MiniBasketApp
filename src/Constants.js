import { Dimensions } from 'react-native';


const {height, width} = Dimensions.get('window');

export const DEVICE_HEIGHT = height;
export const DEVICE_WIDTH = width;


export const BALL_SIZE = 70;
export const TARGET_SIZE = 70;
export const VITESSES = [10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50];