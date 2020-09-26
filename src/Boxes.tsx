import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

const a = 1
const b = 1.5

const Box: React.FC<any> = props => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      const rotation = mesh.current.rotation as THREE.Euler
      rotation.x += 0.01
      rotation.y += 0.01
    }
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [b, b, b] : [a, a, a]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export const Boxes = () => {
  return (
    <Canvas colorManagement>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
