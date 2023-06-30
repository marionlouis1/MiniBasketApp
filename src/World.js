import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

import { Accelerometer } from 'expo-sensors';

import randomInt from 'random-int';
import sampleSize from 'lodash.samplesize';

import Ball from "./components/Boule";
import Cible from "./components/Cible";
import {BALL_SIZE,TARGET_SIZE, DEVICE_HEIGHT, DEVICE_WIDTH, VITESSES} from "./Constants";

import { ball, cible } from "./Objects";


Accelerometer.setUpdateInterval(15)



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
    const {engine, world} = this.addObjectsToWorld(ball, cible);
    this.entities = this.getEntities(engine, world, ball, cible);
    
  }
  
  componentDidMount = () => {
    Matter.Body.setPosition(ball, {
      x: randomInt(0, DEVICE_WIDTH - BALL_SIZE),
      y: randomInt(0, DEVICE_HEIGHT/2),
    });
    Matter.Body.setPosition(cible, {
      x: DEVICE_WIDTH/2 - TARGET_SIZE,
      y: 0.7*DEVICE_HEIGHT,
    });

    measureDistanceTargetBall = (ball, cible) => {
      const distance = Math.sqrt(Math.pow(ball.position.x - cible.position.x, 2) + Math.pow(ball.position.y - cible.position.y, 2));
      if (distance < 50) {
        this.setState({
          score: this.state.score + 1,
        });
        Matter.Body.setPosition(ball, {
          x: randomInt(0, DEVICE_WIDTH - BALL_SIZE),
          y: randomInt(0, DEVICE_HEIGHT/2),
        });
        Matter.Body.setPosition(cible, {
          x: randomInt(0,DEVICE_WIDTH/2 - TARGET_SIZE),
          y: 0.7*DEVICE_HEIGHT,
        });
      }
    
    }
    this.Accelerometer = Accelerometer.addListener(AccelerometerData => {
      if (!this.state.isGamePaused && ball.position.y < cible.position.y) {
        measureDistanceTargetBall(ball, cible)
        console.log(this.state.score)
        if (ball.position.x > DEVICE_WIDTH- BALL_SIZE/2) {
          Matter.Body.setPosition(ball, {
            x: DEVICE_WIDTH- BALL_SIZE/2,
            y: ball.position.y + VITESSES[this.state.score],
          })
        } else if (ball.position.x <BALL_SIZE/2) {
          Matter.Body.setPosition(ball, {
            x: BALL_SIZE/2,
            y: ball.position.y + VITESSES[this.state.score],

          })
        } else {
          Matter.Body.setPosition(ball, {
            x: ball.position.x + AccelerometerData.x * 10,
            y: ball.position.y + VITESSES[this.state.score] ,

          });
        }
      }
    });
  
    this.setState({
      isGameSetup: true,
    });
  };
  
  componentWillUnmount = () => {
    if (this.Accelerometer) {
      this.Accelerometer.remove();
    }
  };
  
  addObjectsToWorld = (ball, cible) => {
    // Le reste de votre code pour la méthode addObjectsToWorld
  };
   
  addObjectsToWorld = (ball, cible) => {
    const engine = Matter.Engine.create({enableSleeping: false});
    const world = engine.world;
    
    let objects = [ball, cible];
    
    Matter.World.add(world, objects);
    
    return {
      engine,
      world,
    };
  };
  
  
  getEntities = (engine, world, ball, cible) => {
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

          cible: {
            body: cible,
            size: [TARGET_SIZE, TARGET_SIZE],
            image: require('../assets/cible.png'),
            renderer: Cible,
          }
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
                    y: randomInt(0, cible.position.y),
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
