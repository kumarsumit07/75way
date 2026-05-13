'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/** Glossy brand blue (reference was for framing, not black) */
const BOT = {
  body: '#1d4ed8',
  bodyDeep: '#172554',
  metalness: 0.72,
  roughness: 0.22,
  clearcoat: 1,
  clearcoatRoughness: 0.14,
}

/** White / red tech spheres like reference (one hero ball slightly larger) */
const JUGGLE_BALLS = [
  { label: 'AI', base: '#ffffff', labelColor: '#0a59c2' },
  { label: 'WEB3', base: '#0a59c2', labelColor: '#ffffff' },
  { label: 'CRM', base: '#ffffff', labelColor: '#003484' },
  { label: 'APPS', base: '#0a59c2', labelColor: '#ffffff' },
  { label: 'IOT', base: '#00118d', labelColor: '#ffffff', radiusMul: 1.22 },
]

const BALL_RADIUS = 0.18

const scratchMid = new THREE.Vector3()

/**
 * Bartender-style high toss between hands + optional “clock” ring at apex (cinematic).
 * u in [0,1] should already be eased (e.g. smootherstep).
 */
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

/** Smootherstep — softer accel/decel for a premium motion feel */
function smootherstep(t) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * x * (x * (x * 6 - 15) + 10)
}

/** Shared toss easing for arms + juggling paths — single `const` so it cannot be redeclared. */
const easeJugglePhase = (t) => {
  const x = Math.min(1, Math.max(0, t))
  return smootherstep(smootherstep(x))
}

/** Palm rest points (turntable‑local) — must match `baseHand` below */
const REST_L = new THREE.Vector3(-0.86, 0.95, 0.55)
const REST_R = new THREE.Vector3(0.86, 0.95, 0.55)

/** Must stay identical for arms + `JugglingBalls` */
const CASCADE = {
  arcH: 2.12,
  zBulge: 0.52,
  ringR: 0.34,
  clockK: 0.82,
  clockRL: Math.PI * 0.35,
}

const HAIR = '#0a0f18'

function RobotPart({ children, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      {children}
      <meshPhysicalMaterial
        color={BOT.body}
        metalness={BOT.metalness}
        roughness={BOT.roughness}
        clearcoat={BOT.clearcoat}
        clearcoatRoughness={BOT.clearcoatRoughness}
        sheen={0.35}
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
  const shoulderPos = useMemo(() => [s * 0.48, 1.35, 0.02], [s])
  const elbowRef = useRef()
  const wristRef = useRef()
  const upperRef = useRef()
  const forearmRef = useRef()

  const baseElbow = useMemo(() => [s * 0.44, 0.85, 0.12], [s])
  const baseHand = useMemo(() => [s * 0.86, 0.95, 0.55], [s])

  const cascadeScratch = useMemo(() => new THREE.Vector3(), [])
  const chordScratch = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = throwPhase.current
    const po = observePhase.current
    const angL = t * CASCADE.clockK
    const angR = t * CASCADE.clockK + CASCADE.clockRL

    let dx = 0
    let dy = 0
    let dz = 0

    if (p >= 0 && p <= 1) {
      const u = easeJugglePhase(p)
      const w = Math.sin(Math.PI * u)
      if (s < 0) {
        bartenderCascadePoint(REST_L, REST_R, u, CASCADE.arcH, CASCADE.zBulge, CASCADE.ringR, angL, cascadeScratch)
        chordScratch.copy(REST_L).lerp(REST_R, u)
      } else {
        bartenderCascadePoint(REST_R, REST_L, u, CASCADE.arcH, CASCADE.zBulge, CASCADE.ringR, angR, cascadeScratch)
        chordScratch.copy(REST_R).lerp(REST_L, u)
      }
      const liftX = cascadeScratch.x - chordScratch.x
      const liftY = cascadeScratch.y - chordScratch.y
      const liftZ = cascadeScratch.z - chordScratch.z
      // Subtle motion only — hands stay near natural rest, balls do the big arc.
      dy = liftY * 0.3
      dx = liftX * 0.12 * w
      dz = liftZ * 0.22 * w
    } else if (po >= 0 && po <= 1) {
      // Light catch prep only — do NOT reuse the full toss bezier here or both arms collapse toward one side.
      const uo = easeJugglePhase(po)
      const w = Math.sin(Math.PI * uo)
      dy = w * 0.035
      dz = w * 0.018
      dx = -s * w * 0.035
    }

    const elbow = [baseElbow[0] + dx * 0.28, baseElbow[1] + dy * 0.2, baseElbow[2] + dz * 0.28]
    const hand = [baseHand[0] + dx, baseHand[1] + dy, baseHand[2] + dz]

    if (elbowRef.current) elbowRef.current.position.set(elbow[0], elbow[1], elbow[2])
    if (wristRef.current) wristRef.current.position.set(hand[0], hand[1], hand[2])
    if (handRef.current) handRef.current.position.set(hand[0], hand[1], hand[2])

    setBone(upperRef.current, shoulderPos, elbow)
    setBone(forearmRef.current, elbow, hand)
  })

  return (
    <group>
      <RobotPart position={shoulderPos}>
        <sphereGeometry args={[0.16, 32, 32]} />
      </RobotPart>

      <mesh ref={upperRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.115, 0.1, 1, 24, 1]} />
        <meshPhysicalMaterial
          color={BOT.body}
          metalness={BOT.metalness}
          roughness={BOT.roughness}
          clearcoat={BOT.clearcoat}
          clearcoatRoughness={BOT.clearcoatRoughness}
          sheen={0.3}
          sheenColor="#93c5fd"
        />
      </mesh>

      <mesh ref={elbowRef} castShadow>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshPhysicalMaterial
          color={BOT.bodyDeep}
          metalness={0.78}
          roughness={0.26}
          clearcoat={0.95}
          clearcoatRoughness={0.14}
        />
      </mesh>

      <mesh ref={forearmRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.095, 0.078, 1, 24, 1]} />
        <meshPhysicalMaterial
          color={BOT.body}
          metalness={BOT.metalness}
          roughness={BOT.roughness}
          clearcoat={BOT.clearcoat}
          clearcoatRoughness={BOT.clearcoatRoughness}
          sheen={0.3}
          sheenColor="#93c5fd"
        />
      </mesh>

      <group ref={wristRef}>
        <RobotPart>
          <sphereGeometry args={[0.075, 20, 20]} />
        </RobotPart>
      </group>

      <group ref={handRef}>
        <RobotPart>
          <boxGeometry args={[0.16, 0.08, 0.2]} />
        </RobotPart>
        {[-0.045, -0.015, 0.015, 0.045].map((x, i) => (
          <RobotPart key={i} position={[x, 0.0, 0.13]}>
            <capsuleGeometry args={[0.018, 0.07, 8, 12]} />
          </RobotPart>
        ))}
        <RobotPart position={[s * 0.07, 0.0, 0.02]} rotation={[0, 0, s * 0.4]}>
          <capsuleGeometry args={[0.022, 0.06, 8, 12]} />
        </RobotPart>
      </group>
    </group>
  )
}

function Leg({ side }) {
  const s = side
  return (
    <group>
      <RobotPart position={[s * 0.18, 0.05, 0]}>
        <sphereGeometry args={[0.15, 24, 24]} />
      </RobotPart>
      <RobotPart position={[s * 0.18, -0.32, 0]}>
        <capsuleGeometry args={[0.14, 0.5, 16, 24]} />
      </RobotPart>
      <RobotPart position={[s * 0.18, -0.7, 0.02]}>
        <sphereGeometry args={[0.12, 20, 20]} />
      </RobotPart>
      <RobotPart position={[s * 0.18, -1.05, 0.04]}>
        <capsuleGeometry args={[0.12, 0.48, 16, 24]} />
      </RobotPart>
      <mesh position={[s * 0.18, -1.4, 0.05]} castShadow>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color={BOT.bodyDeep} metalness={0.55} roughness={0.38} />
      </mesh>
      <mesh position={[s * 0.18, -1.48, 0.14]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.12, 0.38]} />
        <meshPhysicalMaterial
          color={BOT.bodyDeep}
          metalness={0.6}
          roughness={0.36}
          clearcoat={0.55}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </group>
  )
}

/** Balls: turntable-local; bartender-high toss + clock ring at apex. */
function JugglingBalls({ turntableRef, jugglePeriod }) {
  const n = JUGGLE_BALLS.length
  const ballRefs = useMemo(
    () => Array.from({ length: n }, () => ({ current: null })),
    [n]
  )
  const ballRefCallbacks = useMemo(
    () => ballRefs.map((ref) => (element) => {
      ref.current = element
    }),
    [ballRefs]
  )
  const scratch = useMemo(
    () => ({
      pos: new THREE.Vector3(),
    }),
    []
  )
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
        const nextX = g.rotation.x + dt * spin * 0.85
        const nextY = g.rotation.y + dt * spin * 0.62
        const nextZ = g.rotation.z + dt * spin * 0.34
        g.rotation.set(nextX, nextY, nextZ)
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
              <meshPhysicalMaterial
                color={b.base}
                roughness={0.28}
                metalness={0.06}
                clearcoat={0.55}
                clearcoatRoughness={0.2}
              />
            </mesh>
            <Text
              position={[0, 0, r * 0.98]}
              fontSize={r * 0.62}
              color={b.labelColor}
              anchorX="center"
              anchorY="middle"
              outlineWidth={r * 0.06}
              outlineColor="#0a0a0a"
              fontWeight={800}
              maxWidth={r * 2.2}
            >
              {b.label}
            </Text>
          </group>
        )
      })}
    </>
  )
}

function RobotScene({ jugglePeriod = 2.05 }) {
  const turntableRef = useRef()
  const head = useRef()
  const leftPhase = useRef(-1)
  const rightPhase = useRef(-1)
  const leftHandRef = useRef()
  const rightHandRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (turntableRef.current) {
      turntableRef.current.rotation.y = t * 0.15
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.32) * 0.055
      head.current.rotation.x = Math.sin(t * 0.52) * 0.025
    }
    const cycle = 2 * jugglePeriod
    const localT = t % cycle
    leftPhase.current = localT < jugglePeriod ? localT / jugglePeriod : -1
    rightPhase.current = localT >= jugglePeriod ? (localT - jugglePeriod) / jugglePeriod : -1
  })

  return (
    <group ref={turntableRef} position={[0, -0.36, 0]}>
      <group ref={head} position={[0, 1.85, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.34, 56, 56]} />
          <meshPhysicalMaterial
            color={BOT.body}
            metalness={BOT.metalness}
            roughness={BOT.roughness}
            clearcoat={BOT.clearcoat}
            clearcoatRoughness={BOT.clearcoatRoughness}
            sheen={0.38}
            sheenColor="#bfdbfe"
          />
        </mesh>

        {/* Hair — cap + fringe */}
        <mesh position={[0, 0.1, -0.03]} castShadow receiveShadow>
          <sphereGeometry args={[0.348, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2.12]} />
          <meshPhysicalMaterial
            color={HAIR}
            roughness={0.48}
            metalness={0.12}
            clearcoat={0.45}
            clearcoatRoughness={0.35}
          />
        </mesh>
        <mesh position={[0, 0.16, 0.22]} rotation={[0.42, 0, 0]} castShadow>
          <sphereGeometry args={[0.17, 28, 28, 0, Math.PI * 2, 0, Math.PI / 2.28]} />
          <meshPhysicalMaterial color={HAIR} roughness={0.52} metalness={0.1} clearcoat={0.35} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.1, 0.035, 0.285]} castShadow>
          <sphereGeometry args={[0.046, 22, 22]} />
          <meshStandardMaterial color="#fafafa" roughness={0.32} metalness={0.05} />
        </mesh>
        <mesh position={[0.1, 0.035, 0.285]} castShadow>
          <sphereGeometry args={[0.046, 22, 22]} />
          <meshStandardMaterial color="#fafafa" roughness={0.32} metalness={0.05} />
        </mesh>
        <mesh position={[-0.1, 0.035, 0.322]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.35} />
        </mesh>
        <mesh position={[0.1, 0.035, 0.322]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.35} />
        </mesh>
        <mesh position={[-0.1, 0.12, 0.28]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.075, 0.016, 0.035]} />
          <meshStandardMaterial color={HAIR} roughness={0.65} />
        </mesh>
        <mesh position={[0.1, 0.12, 0.28]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.075, 0.016, 0.035]} />
          <meshStandardMaterial color={HAIR} roughness={0.65} />
        </mesh>

        {/* Nose + smile */}
        <mesh position={[0, -0.02, 0.31]} castShadow>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshPhysicalMaterial color="#93c5fd" roughness={0.4} metalness={0.2} clearcoat={0.35} />
        </mesh>
        <mesh position={[0, -0.14, 0.285]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.065, 0.015, 12, 28, Math.PI * 1.05]} />
          <meshPhysicalMaterial color="#fecdd3" roughness={0.42} clearcoat={0.25} sheen={0.4} sheenColor="#fda4af" />
        </mesh>
      </group>

      <RobotPart position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.14, 24]} />
      </RobotPart>

      <RobotPart position={[0, 1.2, 0]}>
        <capsuleGeometry args={[0.32, 0.25, 16, 24]} />
      </RobotPart>
      <RobotPart position={[0, 0.85, 0]}>
        <boxGeometry args={[0.62, 0.6, 0.42]} />
      </RobotPart>
      <RobotPart position={[0, 0.5, 0]}>
        <boxGeometry args={[0.56, 0.18, 0.4]} />
      </RobotPart>
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[0.6, 0.08, 0.44]} />
        <meshStandardMaterial color={BOT.bodyDeep} metalness={0.8} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.38, 0.23]}>
        <boxGeometry args={[0.1, 0.07, 0.02]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.88} roughness={0.2} />
      </mesh>

      <Arm side={-1} throwPhase={leftPhase} observePhase={rightPhase} handRef={leftHandRef} />
      <Arm side={1} throwPhase={rightPhase} observePhase={leftPhase} handRef={rightHandRef} />

      <Leg side={-1} />
      <Leg side={1} />

      <JugglingBalls turntableRef={turntableRef} jugglePeriod={jugglePeriod} />
    </group>
  )
}

export default function Robot({ jugglePeriod = 2.05, ...props }) {
  return (
    <div className="h-full min-h-[320px] w-full touch-none [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:touch-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0.1, 0.62, 5.55], fov: 30 }}
      >
        <OrbitControls
          makeDefault
          target={[0, 0.82, 0]}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.4}
          maxPolarAngle={Math.PI / 2.02}
          enableDamping
          dampingFactor={0.065}
          rotateSpeed={0.65}
        />
        <ambientLight intensity={0.42} />
        <hemisphereLight color="#eff6ff" groundColor="#cbd5e1" intensity={0.55} />
        <directionalLight
          position={[-4.5, 8.5, 5]}
          intensity={1.75}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.00025}
        />
        <directionalLight position={[2.5, 4, -3.5]} intensity={0.4} color="#dbeafe" />
        <RobotScene jugglePeriod={jugglePeriod} {...props} />
      </Canvas>
    </div>
  )
}
