import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';

import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

import { Accelerometer } from 'expo-sensors';

import randomInt from 'random-int';
import sampleSize from 'lodash.samplesize';

import Ball from "./components/Boule";
import {BALL_SIZE, DEVICE_HEIGHT, DEVICE_WIDTH} from "./Constants";

import { ball } from "./Objects";

Accelerometer.setUpdateInterval(15)

const _subscribe = () => {
    setSubscription(
        Accelerometer.addListener(setData)
    );
  };

export default class App extends Component {
  
  state = {
    x: DEVICE_WIDTH / 2,
    y: DEVICE_HEIGHT / 2,
    isGameSetup: false, 
    isGamePaused: false,
    score:0,
  };
  
  constructor(props) {
    super(props);
    const {engine, world} = this.addObjectsToWorld(ball);
    this.entities = this.getEntities(engine, world, ball);
  }
  
  componentDidMount = () => {
    Matter.Body.setPosition(ball, {
      x: randomInt(0, DEVICE_WIDTH - BALL_SIZE),
      y: randomInt(0, DEVICE_HEIGHT - BALL_SIZE),
    });
    
    
    this.Accelerometer = Accelerometer.addListener(accelerometerData => {
      if (!this.state.isGamePaused) {
        if (ball.position.x > DEVICE_WIDTH- BALL_SIZE/2) {
          Matter.Body.setPosition(ball, {
          x: DEVICE_WIDTH- BALL_SIZE/2,
          y: ball.position.y - accelerometerData.y * 10,
        })} else if (ball.position.x <BALL_SIZE/2) {
          Matter.Body.setPosition(ball, {
          x: BALL_SIZE/2,
          y: ball.position.y - accelerometerData.y * 10,
        })} else if (ball.position.y > DEVICE_HEIGHT - BALL_SIZE) {
          Matter.Body.setPosition(ball, {
          x: ball.position.x + accelerometerData.x * 10,
          y: DEVICE_HEIGHT - 2*BALL_SIZE,
          })}else if (ball.position.y < BALL_SIZE/2 ) {
            Matter.Body.setPosition(ball, {
            x: ball.position.x + accelerometerData.x * 10,
            y: BALL_SIZE/2,
            })} else {
          Matter.Body.setPosition(ball, {
            x: ball.position.x + accelerometerData.x * 10,
            y: ball.position.y - accelerometerData.y * 10,
            
          });
      }
  }})
    this.setState({
      isGameSetup: true,
    });
    
    componentWillUnmount =() => {
      if (this.accelerometer) {
        this.accelerometer.stop();
      }
    }
  }
  addObjectsToWorld = ball => {
    const engine = Matter.Engine.create({enableSleeping: false});
    const world = engine.world;
    
    let objects = ball;
    
    Matter.World.add(world, objects);
    
    return {
      engine,
      world,
    };
  };
  
  getEntities = (engine, world, ball) => {
    const entities = {
          physics: {
            engine,
            world,
          },
      
      
          playerBall: {
            body: ball,
            size: [BALL_SIZE, BALL_SIZE],
            image: require('../assets/ball.png'),
            renderer: Ball,
          },
        };
      
      
        return entities;
      };

      render() {
        const {isGameSetup, score} = this.state;
      
        if (isGameSetup) {
          return (
            <GameEngine
              style={styles.container}
              systems={this.physics}
              entities={this.entities}
            >
              <View style={styles.infoWrapper}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreText}>Score: {score}</Text>
                  <Button title="Resume" icon ={{name:"arrow-right",size:15,color:"white"}} onPress={() => Accelerometer.setUpdateInterval(15)} />
                  <Button title="Pause" onPress={() => Accelerometer.setUpdateInterval(100000000)} />
                  <Button title="Reset Ball" onPress={() => Matter.Body.setPosition(ball, {
                    x: randomInt(0, DEVICE_WIDTH - BALL_SIZE),
                    y: randomInt(0, DEVICE_HEIGHT - BALL_SIZE),
                  })} />
                </View>
              </View>
            </GameEngine>
          );
        }
      
        return (
          <View style={styles.centered}>
            <Text style={styles.text}>Something isn't right..</Text>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white" ,
  },
  centered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },

  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  }})
