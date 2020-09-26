import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Cubes } from './Cubes'
import { Lights } from './Lights'
import { Environment } from './Environment'

// adapted from https://codesandbox.io/s/alligatordemoreact-three-fiber-0zlu6?file=/src/index.js
export const Alligator = () => (
  <>
    <Canvas colorManagement>
      <Cubes />
      <Lights />
      <Environment />
    </Canvas>
  </>
)
