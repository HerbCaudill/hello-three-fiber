import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { Cube } from './Cube'

export const Cubes: React.FC = () => {
  const group = useRef<THREE.Group>()

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.005
  })

  return (
    <group ref={group}>
      {new Array(50).fill(null).map((_, i) => (
        <Cube key={i} />
      ))}
    </group>
  )
}
