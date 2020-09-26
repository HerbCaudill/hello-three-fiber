import { random } from 'lodash'
import React, { useMemo, useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'

const colors = {
  default: 0xf95b3c,
  hover: 'yellow',
  active: 'white',
}

const randomPosition = () => [random(-3, 3, true), random(-3, 3, true), random(-3, 3, true)]

export const Cube: React.FC<any> = () => {
  const mesh = useRef<THREE.Mesh>()

  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const [activeTime, setActiveTime] = useState(0)

  // const isActiveRef = useRef(isActive)

  // random position & rotation speed
  const position = useMemo(() => randomPosition(), [])
  const rotationSpeed = useMemo(() => random(0.1, 4, true), [])

  const color = isHovered ? colors.hover : isActive ? colors.active : colors.default

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01 * rotationSpeed
      // bounce up & down if active
      if (isActive) {
        setActiveTime(activeTime + 0.01)
        mesh.current.position.y = position[1] + Math.sin(activeTime * 15) * 0.3
      }
    }
  })

  return (
    <mesh
      ref={mesh}
      position={position as [number, number, number]}
      onClick={e => {
        e.stopPropagation()
        setIsActive(v => !v)
      }}
      onPointerOver={e => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={e => {
        e.stopPropagation()
        setIsHovered(false)
      }}
    >
      <boxBufferGeometry attach="geometry" args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial attach="material" color={color} roughness={0.39} metalness={0.5} />
    </mesh>
  )
}
