import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Play, RotateCcw, Volume2, VolumeX, ArrowLeft, Trophy, Flame } from 'lucide-react'

interface SpaceDefenderProps {
  onBack: () => void
  gamerName: string
}

// Sound effects synthesizer using browser Web Audio API
class SoundFX {
  private ctx: AudioContext | null = null
  public enabled: boolean = true

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playLaser() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(800, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12)

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start()
    osc.stop(this.ctx.currentTime + 0.12)
  }

  playExplosion() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(120, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.25)

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start()
    osc.stop(this.ctx.currentTime + 0.25)
  }

  playPowerup() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(350, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.2)

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start()
    osc.stop(this.ctx.currentTime + 0.2)
  }
}

const sfx = new SoundFX()

interface Bullet {
  x: number
  y: number
  radius: number
  speed: number
  color: string
}

interface Enemy {
  x: number
  y: number
  size: number
  speed: number
  hp: number
  maxHp: number
  color: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}

export const SpaceDefender: React.FC<SpaceDefenderProps> = ({ onBack, gamerName }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('game_arena_high_score') || '0', 10)
  })
  const [soundOn, setSoundOn] = useState(true)

  // Game internal state ref
  const gameStateRef = useRef({
    player: { x: 300, y: 480, size: 24, speed: 7 },
    keys: { left: false, right: false, up: false, down: false, shoot: false },
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    lastShot: 0,
    lastSpawn: 0,
    spawnInterval: 1000,
    currentScore: 0,
    animFrame: 0,
  })

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    sfx.enabled = next
  }

  // Handle particle explosion
  const createExplosion = (x: number, y: number, color: string, count = 12) => {
    const particles = gameStateRef.current.particles
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 4 + 1
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        alpha: 1,
        color,
      })
    }
  }

  const startGame = useCallback(() => {
    setIsPlaying(true)
    setIsGameOver(false)
    setScore(0)

    const st = gameStateRef.current
    st.player = { x: 300, y: 480, size: 24, speed: 7 }
    st.bullets = []
    st.enemies = []
    st.particles = []
    st.currentScore = 0
    st.lastSpawn = Date.now()
    st.spawnInterval = 1100
  }, [])

  // Input listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = gameStateRef.current.keys
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = true
      if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = true
      if (['ArrowUp', 'KeyW'].includes(e.code)) keys.up = true
      if (['ArrowDown', 'KeyS'].includes(e.code)) keys.down = true
      if (['Space'].includes(e.code)) {
        keys.shoot = true
        e.preventDefault()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const keys = gameStateRef.current.keys
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = false
      if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = false
      if (['ArrowUp', 'KeyW'].includes(e.code)) keys.up = false
      if (['ArrowDown', 'KeyS'].includes(e.code)) keys.down = false
      if (['Space'].includes(e.code)) keys.shoot = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Main Game Loop
  useEffect(() => {
    if (!isPlaying) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let isRunning = true

    const loop = () => {
      if (!isRunning) return
      const st = gameStateRef.current
      const now = Date.now()

      // 1. Update Player
      if (st.keys.left && st.player.x > st.player.size) {
        st.player.x -= st.player.speed
      }
      if (st.keys.right && st.player.x < canvas.width - st.player.size) {
        st.player.x += st.player.speed
      }
      if (st.keys.up && st.player.y > st.player.size + 40) {
        st.player.y -= st.player.speed
      }
      if (st.keys.down && st.player.y < canvas.height - st.player.size) {
        st.player.y += st.player.speed
      }

      // 2. Shooting
      if (st.keys.shoot && now - st.lastShot > 180) {
        st.bullets.push({
          x: st.player.x,
          y: st.player.y - 18,
          radius: 4,
          speed: 10,
          color: '#38bdf8',
        })
        sfx.playLaser()
        st.lastShot = now
      }

      // 3. Spawning Enemies
      if (now - st.lastSpawn > st.spawnInterval) {
        const size = Math.random() * 16 + 18
        const speed = Math.random() * 2 + 2 + Math.min(st.currentScore / 1000, 3)
        const isElite = Math.random() > 0.8
        st.enemies.push({
          x: Math.random() * (canvas.width - size * 2) + size,
          y: -size,
          size,
          speed,
          hp: isElite ? 3 : 1,
          maxHp: isElite ? 3 : 1,
          color: isElite ? '#ec4899' : '#a855f7',
        })
        st.lastSpawn = now
        st.spawnInterval = Math.max(450, 1000 - Math.floor(st.currentScore / 100) * 40)
      }

      // 4. Update Bullets
      for (let i = st.bullets.length - 1; i >= 0; i--) {
        const b = st.bullets[i]
        b.y -= b.speed
        if (b.y < -10) {
          st.bullets.splice(i, 1)
        }
      }

      // 5. Update Enemies & Check Collisions
      for (let ei = st.enemies.length - 1; ei >= 0; ei--) {
        const e = st.enemies[ei]
        e.y += e.speed

        // Check collision with bullets
        for (let bi = st.bullets.length - 1; bi >= 0; bi--) {
          const b = st.bullets[bi]
          const dist = Math.hypot(b.x - e.x, b.y - e.y)
          if (dist < e.size + b.radius) {
            e.hp -= 1
            st.bullets.splice(bi, 1)
            createExplosion(b.x, b.y, '#38bdf8', 6)

            if (e.hp <= 0) {
              createExplosion(e.x, e.y, e.color, 18)
              sfx.playExplosion()
              const earned = e.maxHp > 1 ? 50 : 20
              st.currentScore += earned
              setScore(st.currentScore)
              st.enemies.splice(ei, 1)
            }
            break
          }
        }

        // Check collision with Player
        const playerDist = Math.hypot(st.player.x - e.x, st.player.y - e.y)
        if (playerDist < st.player.size + e.size) {
          // Game Over
          createExplosion(st.player.x, st.player.y, '#f43f5e', 30)
          sfx.playExplosion()
          setIsGameOver(true)
          setIsPlaying(false)

          if (st.currentScore > highScore) {
            setHighScore(st.currentScore)
            localStorage.setItem('game_arena_high_score', st.currentScore.toString())
            sfx.playPowerup()
          }
          return
        }

        // Offscreen
        if (e.y > canvas.height + e.size) {
          st.enemies.splice(ei, 1)
        }
      }

      // 6. Update Particles
      for (let pi = st.particles.length - 1; pi >= 0; pi--) {
        const p = st.particles[pi]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.03
        if (p.alpha <= 0) {
          st.particles.splice(pi, 1)
        }
      }

      // 7. RENDER
      ctx.fillStyle = '#0b0f19'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Background stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      for (let s = 0; s < 25; s++) {
        const sx = (Math.sin(s * 99 + now * 0.0002) * 0.5 + 0.5) * canvas.width
        const sy = ((s * 40 + now * 0.05) % canvas.height)
        ctx.fillRect(sx, sy, 1.5, 1.5)
      }

      // Render Bullets
      st.bullets.forEach((b) => {
        ctx.save()
        ctx.shadowBlur = 10
        ctx.shadowColor = b.color
        ctx.fillStyle = b.color
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Render Enemies
      st.enemies.forEach((e) => {
        ctx.save()
        ctx.shadowBlur = 12
        ctx.shadowColor = e.color
        ctx.fillStyle = e.color

        // Diamond / Star ship
        ctx.beginPath()
        ctx.moveTo(e.x, e.y + e.size)
        ctx.lineTo(e.x - e.size * 0.8, e.y - e.size * 0.6)
        ctx.lineTo(e.x, e.y - e.size * 0.2)
        ctx.lineTo(e.x + e.size * 0.8, e.y - e.size * 0.6)
        ctx.closePath()
        ctx.fill()

        // HP bar for elites
        if (e.maxHp > 1) {
          const barW = e.size * 1.5
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
          ctx.fillRect(e.x - barW / 2, e.y - e.size - 8, barW, 4)
          ctx.fillStyle = '#22c55e'
          ctx.fillRect(e.x - barW / 2, e.y - e.size - 8, (barW * e.hp) / e.maxHp, 4)
        }
        ctx.restore()
      })

      // Render Particles
      st.particles.forEach((p) => {
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Render Player (Fighter jet)
      ctx.save()
      ctx.shadowBlur = 16
      ctx.shadowColor = '#38bdf8'
      ctx.fillStyle = '#0284c7'

      ctx.beginPath()
      ctx.moveTo(st.player.x, st.player.y - st.player.size)
      ctx.lineTo(st.player.x - st.player.size * 0.7, st.player.y + st.player.size * 0.7)
      ctx.lineTo(st.player.x, st.player.y + st.player.size * 0.3)
      ctx.lineTo(st.player.x + st.player.size * 0.7, st.player.y + st.player.size * 0.7)
      ctx.closePath()
      ctx.fill()

      // Cockpit glow
      ctx.fillStyle = '#38bdf8'
      ctx.beginPath()
      ctx.arc(st.player.x, st.player.y, 4, 0, Math.PI * 2)
      ctx.fill()

      // Engine Flame
      ctx.fillStyle = '#f59e0b'
      ctx.beginPath()
      ctx.moveTo(st.player.x - 5, st.player.y + st.player.size * 0.4)
      ctx.lineTo(st.player.x, st.player.y + st.player.size * 0.9 + Math.random() * 8)
      ctx.lineTo(st.player.x + 5, st.player.y + st.player.size * 0.4)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      gameStateRef.current.animFrame = requestAnimationFrame(loop)
    }

    gameStateRef.current.animFrame = requestAnimationFrame(loop)

    return () => {
      isRunning = false
      cancelAnimationFrame(gameStateRef.current.animFrame)
    }
  }, [isPlaying, highScore])

  return (
    <div className="game-screen-wrapper">
      <div className="game-screen-header">
        <button onClick={onBack} className="back-btn">
          <ArrowLeft size={18} />
          <span>Hub</span>
        </button>
        <div className="game-hud">
          <div className="hud-stat">
            <Flame size={18} className="hud-icon flame" />
            <span>Score: <strong>{score}</strong></span>
          </div>
          <div className="hud-stat">
            <Trophy size={18} className="hud-icon trophy" />
            <span>Best: <strong>{highScore}</strong></span>
          </div>
        </div>
        <button onClick={toggleSound} className="sound-toggle-btn" aria-label="Toggle Sound">
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={600}
          height={550}
          className="game-canvas"
        />

        {/* Start / Game Over Overlay */}
        {(!isPlaying || isGameOver) && (
          <div className="game-overlay">
            {isGameOver ? (
              <div className="overlay-box gameover">
                <h2>MISSION FAILED</h2>
                <p>Nice try, <strong>{gamerName}</strong>!</p>
                <div className="final-stats">
                  <div>Final Score: <span>{score}</span></div>
                  <div>High Score: <span>{highScore}</span></div>
                </div>
                <button onClick={startGame} className="overlay-action-btn pulse">
                  <RotateCcw size={18} />
                  <span>Play Again</span>
                </button>
              </div>
            ) : (
              <div className="overlay-box start">
                <h2>CYBER DEFENDER</h2>
                <p>Defend the galaxy! Use keyboard or touch to control your starship.</p>
                <div className="controls-guide">
                  <div><kbd>A</kbd> <kbd>D</kbd> or <kbd>←</kbd> <kbd>→</kbd> : Move</div>
                  <div><kbd>SPACE</kbd> : Fire Plasma Lasers</div>
                </div>
                <button onClick={startGame} className="overlay-action-btn glow">
                  <Play size={18} />
                  <span>Launch Fighter</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
