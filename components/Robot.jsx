'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/** Premium Humanoid Palette */
const THEME = {
  skin: '#1d4ed8',   // Metallic robotic skin
  skinDeep: '#0f172a', 
  shirt: '#2563eb',  // Premium blue shirt
  pants: '#f8fafc',  // Clean white pants
  metalness: 0.65,
  roughness: 0.28,
}

/** White / tech spheres for juggling */
const JUGGLE_BALLS = [
  { label: 'AI', base: '#ffffff', labelColor: '#0a59c2' },
  { label: 'WEB3', base: '#0a59c2', labelColor: '#ffffff' },
  { label: 'CRM', base: '#ffffff', labelColor: '#003484' },
  { label: 'APPS', base: '#0a59c2', labelColor: '#ffffff' },
  { label: 'IOT', base: '#00118d', labelColor: '#ffffff', radiusMul: 1.22 },
]

const BALL_RADIUS = 0.18
const HAIR = '#0a0f18'
const scratchMid = new THREE.Vector3()

/** Palm rest points (turntable‑local) */
const REST_L = new THREE.Vector3(-0.86, 0.95, 0.55)
const REST_R = new THREE.Vector3(0.86, 0.95, 0.55)

const CASCADE = {
  arcH: 2.12,
  zBulge: 0.52,
  ringR: 0.34,
  clockK: 0.82,
  clockRL: Math.PI * 0.35,
}

/** Bartender-style toss point calculation */
function bartenderCascadePoint(a, b, u, arcHeight, zBulge, ringR, clockAngle, target) {
  const mid = scratchMid.copy(a).add(b).multiplyScalar(0.5)
  const bell = Math.sin(Math.PI * u)
  const bellSoft = Math.pow(bell, 0.82)
  mid.y += arcHeight * bellSoft + 0.38 * bell * bell
  mid.z += zBulge * bell
  const o = 1 - u
  target.set(0, 0, 0)
  target.addScaledVector(a, o * o)
  target.addScaledVector(mid, 2 * o * u)
  target.addScaledVector(b, u * u)
  const apexW = bell
  target.x += Math.cos(clockAngle) * ringR * apexW
  target.z += Math.sin(clockAngle) * ringR * 0.7 * apexW
  return target
}

function smootherstep(t) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * x * (x * (x * 6 - 15) + 10)
}

const easeJugglePhase = (t) => smootherstep(Math.min(1, Math.max(0, t)))

function RobotPart({ children, color = THEME.skin, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      {children}
      <meshPhysicalMaterial
        color={color}
        metalness={color === THEME.pants ? 0.1 : THEME.metalness}
        roughness={color === THEME.pants ? 0.5 : THEME.roughness}
        clearcoat={color === THEME.pants ? 0.1 : 0.8}
        clearcoatRoughness={0.15}
        sheen={0.4}
        sheenColor="#93c5fd"
      />
    </mesh>
  )
}

function setBone(mesh, from, to) {
  if (!mesh) return
  const a = new THREE.Vector3().fromArray(from)
  const b = new THREE.Vector3().fromArray(to)
  const dir = new THREE.Vector3().subVectors(b, a)
  const len = dir.length()
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5)
  const up = new THREE.Vector3(0, 1, 0)
  const q = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize())
  mesh.position.copy(mid)
  mesh.quaternion.copy(q)
  mesh.scale.set(1, len, 1)
}

function Arm({ side, throwPhase, observePhase, handRef }) {
  const s = side
  // Realistic Human Proportions: Shoulders wider, anatomy segmented
  const shoulderPos = useMemo(() => [s * 0.64, 1.48, 0.05], [s])
  const elbowRef = useRef()
  const wristRef = useRef()
  const upperRef = useRef()
  const forearmRef = useRef()

  const baseElbow = useMemo(() => [s * 0.58, 0.92, 0.2], [s])
  const baseHand = useMemo(() => [s * 0.9, 1.05, 0.58], [s])

  const cascadeScratch = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = throwPhase.current
    const po = observePhase.current

    // 1. Bartender-style micro-flicks (Subtle & Energetic)
    const u = p >= 0 && p <= 1 ? easeJugglePhase(p) : 0
    const w = Math.sin(Math.PI * u)
    const uo = po >= 0 && po <= 1 ? easeJugglePhase(po) : 0
    const wo = Math.sin(Math.PI * uo)

    // Minimal displacement, high control
    let dx = -s * w * 0.08 + s * wo * 0.03
    let dy = w * 0.04 + wo * 0.015
    let dz = w * 0.03 + wo * 0.005

    // Rhythmic breathing / micro-jiggle
    const jive = Math.sin(t * 16 + s * 4) * 0.004
    dx += jive
    dy += Math.cos(t * 14 + s) * 0.003

    // Natural wrist rotation (rz) + tiny shakes (rx)
    const rz = -s * w * 0.28 + s * wo * 0.12
    const rx = Math.sin(t * 22) * 0.012

    const elbow = [baseElbow[0] + dx * 0.15, baseElbow[1] + dy * 0.1, baseElbow[2] + dz * 0.12]
    const hand = [baseHand[0] + dx, baseHand[1] + dy, baseHand[2] + dz]

    if (elbowRef.current) elbowRef.current.position.set(elbow[0], elbow[1], elbow[2])
    if (wristRef.current) wristRef.current.position.set(hand[0], hand[1], hand[2])
    
    if (handRef.current) {
      handRef.current.position.set(hand[0], hand[1], hand[2])
      handRef.current.rotation.set(rx, 0, rz)
    }

    setBone(upperRef.current, shoulderPos, elbow)
    setBone(forearmRef.current, elbow, hand)
  })

  return (
    <group>
      {/* Shoulder Sleeve (Part of Blue Shirt) */}
      <RobotPart position={shoulderPos} color={THEME.shirt}>
        <sphereGeometry args={[0.24, 32, 32]} />
      </RobotPart>

      {/* Upper Arm / Bicep (Blue Shirt Sleeve) */}
      <mesh ref={upperRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.14, 0.12, 1, 24, 1]} />
        <meshPhysicalMaterial
          color={THEME.shirt}
          metalness={0.1}
          roughness={0.6}
          sheen={0.4}
          sheenColor="#93c5fd"
        />
      </mesh>

      {/* Elbow Joint (Robotic Metal) */}
      <mesh ref={elbowRef} castShadow>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshPhysicalMaterial color={THEME.skinDeep} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Forearm (Metallic Robotic Skin) */}
      <mesh ref={forearmRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.11, 0.08, 1, 24, 1]} />
        <meshPhysicalMaterial color={THEME.skin} metalness={THEME.metalness} roughness={THEME.roughness} />
      </mesh>

      <group ref={wristRef}>
        <RobotPart>
          <sphereGeometry args={[0.07, 20, 20]} />
        </RobotPart>
      </group>

      <group ref={handRef}>
        <RobotPart>
          <boxGeometry args={[0.15, 0.08, 0.2]} />
        </RobotPart>
        {[-0.045, -0.015, 0.015, 0.045].map((x, i) => (
          <RobotPart key={i} position={[x, 0.0, 0.14]}>
            <capsuleGeometry args={[0.016, 0.08, 8, 12]} />
          </RobotPart>
        ))}
        <RobotPart position={[s * 0.07, 0.0, 0.03]} rotation={[0, 0, s * 0.4]}>
          <capsuleGeometry args={[0.02, 0.07, 8, 12]} />
        </RobotPart>
      </group>
    </group>
  )
}

function Leg({ side }) {
  const s = side
  return (
    <group position={[s * 0.22, 0.2, 0]}>
      {/* Hip Socket (White Pants) */}
      <RobotPart position={[0, 0.2, 0]} color={THEME.pants}>
        <sphereGeometry args={[0.19, 24, 24]} />
      </RobotPart>
      
      {/* Thigh (White Pants) */}
      <RobotPart position={[0, -0.15, 0]} color={THEME.pants}>
        <capsuleGeometry args={[0.18, 0.62, 16, 24]} />
      </RobotPart>
      
      {/* Knee (Robotic Joint) */}
      <RobotPart position={[0, -0.58, 0.02]} color={THEME.skinDeep}>
        <sphereGeometry args={[0.13, 20, 20]} />
      </RobotPart>
      
      {/* Calf (White Pants) */}
      <RobotPart position={[0, -0.98, 0.04]} color={THEME.pants}>
        <capsuleGeometry args={[0.15, 0.58, 16, 24]} />
      </RobotPart>
      
      {/* Ankle / Shoe Base */}
      <mesh position={[0, -1.35, 0.06]} castShadow>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} />
      </mesh>
      {/* Modern Shoe */}
      <mesh position={[0, -1.45, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.14, 0.46]} />
        <meshPhysicalMaterial color="#020617" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

function JugglingBalls({ turntableRef, jugglePeriod }) {
  const n = JUGGLE_BALLS.length
  const ballRefs = useMemo(() => Array.from({ length: n }, () => ({ current: null })), [n])
  const ballRefCallbacks = useMemo(() => ballRefs.map((ref) => (element) => { ref.current = element }), [ballRefs])
  const scratch = useMemo(() => ({ pos: new THREE.Vector3() }), [])
  const cycle = 2 * jugglePeriod

  useFrame((state) => {
    const parent = turntableRef.current
    if (!parent) return
    const t = state.clock.elapsedTime
    const dt = state.clock.getDelta()
    const { pos } = scratch

    for (let i = 0; i < n; i++) {
      const shifted = (t + (i * cycle) / n) % cycle
      const phase = shifted / cycle
      const pLin = phase < 0.5 ? phase * 2 : (phase - 0.5) * 2
      const p = easeJugglePhase(pLin)
      const clockAngle = t * CASCADE.clockK + i * ((Math.PI * 2) / n)
      if (phase < 0.5) {
        bartenderCascadePoint(REST_L, REST_R, p, CASCADE.arcH, CASCADE.zBulge, CASCADE.ringR, clockAngle, pos)
      } else {
        bartenderCascadePoint(REST_R, REST_L, p, CASCADE.arcH, CASCADE.zBulge, CASCADE.ringR, clockAngle + CASCADE.clockRL, pos)
      }
      const g = ballRefs[i].current
      if (g) {
        g.position.copy(pos)
        const spin = 1.05 + i * 0.08
        g.rotation.x += dt * spin * 0.85
        g.rotation.y += dt * spin * 0.62
        g.rotation.z += dt * spin * 0.34
      }
    }
  })

  return (
    <>
      {JUGGLE_BALLS.map((b, i) => {
        const r = BALL_RADIUS * (b.radiusMul ?? 1)
        return (
          <group key={b.label} ref={ballRefCallbacks[i]} castShadow>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[r, 40, 40]} />
              <meshPhysicalMaterial color={b.base} roughness={0.28} metalness={0.06} clearcoat={0.55} clearcoatRoughness={0.2} />
            </mesh>
            <Text position={[0, 0, r * 0.98]} fontSize={r * 0.62} color={b.labelColor} anchorX="center" anchorY="middle" outlineWidth={r * 0.06} outlineColor="#0a0a0a" fontWeight={800} maxWidth={r * 2.2}>
              {b.label}
            </Text>
          </group>
        )
      })}
    </>
  )
}

function RobotScene({ jugglePeriod = 1.25 }) {
  const turntableRef = useRef()
  const head = useRef()
  const leftPhase = useRef(-1)
  const rightPhase = useRef(-1)
  const leftHandRef = useRef()
  const rightHandRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (turntableRef.current) {
      // Energetic cinematic rotation
      turntableRef.current.rotation.y = t * 0.45
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.42) * 0.08
      head.current.rotation.x = Math.sin(t * 0.65) * 0.04
    }
    const cycle = 2 * jugglePeriod
    const localT = t % cycle
    leftPhase.current = localT < jugglePeriod ? localT / jugglePeriod : -1
    rightPhase.current = localT >= jugglePeriod ? (localT - jugglePeriod) / jugglePeriod : -1
  })

  return (
    <group ref={turntableRef} position={[0, -0.35, 0]}>
      {/* HUMAN-LIKE HEAD */}
      <group ref={head} position={[0, 2.15, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.34, 64, 64]} />
          <meshPhysicalMaterial color={THEME.skin} metalness={THEME.metalness} roughness={THEME.roughness} clearcoat={1} />
        </mesh>
        {/* Helmet Cap */}
        <mesh position={[0, 0.15, -0.05]} castShadow receiveShadow>
          <sphereGeometry args={[0.35, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color={HAIR} roughness={0.4} clearcoat={0.7} />
        </mesh>
        {/* Glowing Eyes */}
        <mesh position={[-0.1, 0.04, 0.3]} castShadow>
          <sphereGeometry args={[0.045, 24, 24]} />
          <meshStandardMaterial color="#ffffff" emissive="#60a5fa" emissiveIntensity={4} />
        </mesh>
        <mesh position={[0.1, 0.04, 0.3]} castShadow>
          <sphereGeometry args={[0.045, 24, 24]} />
          <meshStandardMaterial color="#ffffff" emissive="#60a5fa" emissiveIntensity={4} />
        </mesh>
      </group>

      {/* Neck Joint */}
      <RobotPart position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.08, 0.11, 0.18, 24]} />
      </RobotPart>

      {/* MUSCULAR HUMAN-LIKE TORSO (BLUE SHIRT) */}
      {/* Chest (Pectorals) */}
      <RobotPart position={[0, 1.5, 0]} color={THEME.shirt}>
        <boxGeometry args={[0.9, 0.48, 0.45]} />
      </RobotPart>
      {/* Pectoral Muscle detail */}
      <RobotPart position={[0, 1.52, 0.18]} color={THEME.shirt}>
        <boxGeometry args={[0.75, 0.32, 0.12]} />
      </RobotPart>

      {/* Waist / V-Taper (Blue Shirt) */}
      <RobotPart position={[0, 1.05, 0]} color={THEME.shirt}>
        <boxGeometry args={[0.65, 0.48, 0.4]} />
      </RobotPart>

      {/* PELVIS / HIP (WHITE PANTS) */}
      <RobotPart position={[0, 0.7, 0]} color={THEME.pants}>
        <boxGeometry args={[0.62, 0.3, 0.42]} />
      </RobotPart>
      {/* Pelvic base plate (White) */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.7, 0.16, 0.48]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
      </mesh>

      <Arm side={-1} throwPhase={leftPhase} observePhase={rightPhase} handRef={leftHandRef} />
      <Arm side={1} throwPhase={rightPhase} observePhase={leftPhase} handRef={rightHandRef} />

      <Leg side={-1} />
      <Leg side={1} />

      <JugglingBalls turntableRef={turntableRef} jugglePeriod={jugglePeriod} />
    </group>
  )
}

export default function Robot({ jugglePeriod = 1.25, ...props }) {
  return (
    <div className="h-full min-h-[320px] w-full touch-none [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:touch-none">
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} camera={{ position: [0, 1, 6.5], fov: 24 }}>
        <OrbitControls makeDefault target={[0, 1.1, 0]} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 1.95} enableDamping dampingFactor={0.08} rotateSpeed={0.5} />
        <ambientLight intensity={0.48} />
        <hemisphereLight color="#f0f9ff" groundColor="#cbd5e1" intensity={0.7} />
        <directionalLight position={[-6, 12, 8]} intensity={2.4} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
        <directionalLight position={[4, 6, -5]} intensity={0.65} color="#dbeafe" />
        <RobotScene jugglePeriod={jugglePeriod} {...props} />
      </Canvas>
    </div>
  )
}
