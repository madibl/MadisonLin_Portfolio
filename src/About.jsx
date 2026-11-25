import { useLayoutEffect, useRef, useState } from 'react'
import background from '../assets/about/background.png'
import texture from '../assets/about/type-texture.png'
import lotus from '../assets/about/lotus.png'
import orbit from '../assets/about/orbit.svg'
import dotFront from '../assets/about/dot-front.svg'
import dotSide from '../assets/about/dot-side.svg'
import dotUpper from '../assets/about/dot-upper.svg'
import dotTop from '../assets/about/dot-top.svg'
import lineSide from '../assets/about/line-side.svg'
import './About.css'

const experienceEntries = [
  {
    id: 'uw-madison',
    title: 'UW Madison',
    subtitle: 'B.S. CS & DS, Game Design Minor',
    paragraphs: [
      'Mercile J Lee Scholar | Lumen Scholar',
      '3.610 GPA',
      'Relevant Courses:\nProgramming II & III, Algorithms, Discrete Math, Machine Organization, Intro to Comp. Eng., Intro to AI, Computer Graphics, Software Engineering, Database Management Systems, Game Design',
      'Orgs: MJL Hackathon Committee, Vietnamese Student Association (Fundraising, President), Vietnamese Traditional Dance Team',
    ],
    marker: [1174.5, 447.5, dotSide, 25],
  },
  {
    id: 'swe-intern-sdk',
    title: 'SWE Intern - SDK',
    marker: [963, 210, dotUpper, 20],
  },
  {
    id: 'swe-intern-framework',
    title: 'SWE Intern - Framework',
    marker: [807.5, 183.5, dotTop, 15],
  },
  {
    id: 'llm-research',
    title: 'LLM Research',
    marker: [468.5, 587.5, dotSide, 25],
  },
  {
    id: 'it-technician',
    title: 'IT Technician',
    marker: [838, 733, dotFront, 30],
  },
]

const center = [800, 460]
const radii = [375, 278]
const fullTurn = 2 * Math.PI

function markerAngle([x, y]) {
  return Math.atan2((y - center[1]) / radii[1], (x - center[0]) / radii[0])
}

const dockAngle = markerAngle(experienceEntries[0].marker)
const experiences = experienceEntries
  .map((entry) => ({
    ...entry,
    stopAngle: (dockAngle - markerAngle(entry.marker) + fullTurn) % fullTurn,
  }))
  .sort((first, second) => first.stopAngle - second.stopAngle)

const lapSize = experiences.length
const middleStop = 2 * lapSize
const lastStop = 4 * lapSize

function wrapStop(position) {
  return position % lapSize
}

function markerPosition(marker, rotation) {
  const startAngle = markerAngle(marker)
  const angle = startAngle + rotation
  return {
    '--x': marker[0] + radii[0] * (Math.cos(angle) - Math.cos(startAngle)),
    '--y': marker[1] + radii[1] * (Math.sin(angle) - Math.sin(startAngle)),
  }
}

function ExperienceCard({ experience }) {
  const {
    title,
    subtitle = '[Organization] · [Dates]',
    paragraphs = [
      '[Describe the role or research project and your responsibilities.]',
      '[List the tools, languages, or methods you used.]',
      '[Summarize a contribution and its outcome.]',
    ],
  } = experience

  return (
    <article className="experience-card" id="experience-card" aria-labelledby="experience-title" aria-live="polite" aria-atomic="true">
      <div className="experience-card-entry" key={experience.id}>
        <svg className="experience-card-connector" viewBox="0 0 55 270" aria-hidden="true">
          <path pathLength="1" d="M0 135C27.46 134.6 35.67 121.45 35.84 110.41C35.84 110.41 36.85 62.23 35.84 32.11C34.83 2 55 2 55 2" />
          <path pathLength="1" d="M0 135C27.46 135.4 35.67 148.55 35.84 159.59C35.84 159.59 36.85 207.77 35.84 237.89C34.83 268 55 268 55 268" />
        </svg>
        <div className="experience-card-panel">
          <div className="experience-card-content">
            <header>
              <h2 id="experience-title">{title}</h2>
              <p>{subtitle}</p>
            </header>
            <div className="experience-card-copy">
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function OrbitLabel({ title, position }) {
  const { '--x': x, '--y': y } = position
  // Keep labels clear of the heading on the upper left and the card on the right.
  const alignLeft = y < 250 || y > 690 ? x < 850 : x > 1050 || (x < 650 && y > 400)
  const offsetX = alignLeft ? -34 : 34
  const offsetY = y < 400 || x > 1050 ? -44 : 44

  return (
    <>
      <img className="orbit-piece orbit-leader" src={lineSide} alt="" style={{
        ...position,
        '--width': Math.hypot(offsetX, offsetY),
        '--angle': `${Math.atan2(offsetY, offsetX)}rad`,
      }} />
      <span className="orbit-piece orbit-label" style={{
        '--x': x + offsetX + (alignLeft ? -6 : 6),
        '--y': y + offsetY,
        '--label-shift': alignLeft ? '-100%' : '0%',
      }}>{title}</span>
    </>
  )
}

function ExperienceOrbit({ rotation, active, progress, onSelect }) {
  const distanceFromStop = Math.abs(progress - Math.round(progress))
  const labelOpacity = Math.max(0, 1 - distanceFromStop / 0.18)
  const dots = experiences.map((experience) => ({
    ...experience,
    position: markerPosition(experience.marker, rotation),
  }))

  return (
    <div className="experience-orbit" role="group" aria-label="Experience stops">
      <div className="orbit-lotus"><img src={lotus} alt="" /></div>
      <img className="orbit-ring" src={orbit} alt="" />
      <div className="orbit-lotus orbit-lotus-front"><img src={lotus} alt="" /></div>
      <div className="orbit-labels" style={{ opacity: labelOpacity }} aria-hidden="true">
        {dots.map(({ id, title, position }) => (
          <OrbitLabel key={id} title={title} position={position} />
        ))}
      </div>
      {dots.map(({ id, title, marker, position }, index) => (
        <button
          key={id}
          className="orbit-piece orbit-dot"
          type="button"
          style={{ ...position, '--size': marker[3] }}
          aria-label={title}
          aria-controls="experience-card"
          aria-current={index === active ? 'step' : undefined}
          title={title}
          onClick={() => onSelect(index)}
        >
          <img src={marker[2]} alt="" />
        </button>
      ))}
    </div>
  )
}

export default function About({ homeHref }) {
  const scroller = useRef(null)
  const [progress, setProgress] = useState(0)
  const active = wrapStop(Math.round(progress))
  const lower = Math.floor(progress)
  const startAngle = experiences[lower].stopAngle
  const nextAngle = experiences[lower + 1]?.stopAngle ?? fullTurn
  const rotation = startAngle + (progress - lower) * (nextAngle - startAngle)

  useLayoutEffect(() => {
    const element = scroller.current
    element.scrollTo({ top: middleStop * element.clientHeight, behavior: 'instant' })
  }, [])

  function updateScroll({ currentTarget }) {
    const { scrollTop, clientHeight, scrollHeight } = currentTarget
    const position = scrollTop / clientHeight
    // The ends show the same stop as the center, so recenter without a visual jump.
    if (scrollTop <= 0 || scrollTop >= scrollHeight - clientHeight - 1) {
      currentTarget.scrollTo({ top: middleStop * clientHeight, behavior: 'instant' })
      setProgress(0)
      return
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setProgress(wrapStop(reduceMotion ? Math.round(position) : position))
  }

  function selectExperience(index) {
    const element = scroller.current
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    const position = element.scrollTop / element.clientHeight
    const nearestStop = index + Math.round((position - index) / lapSize) * lapSize
    const stop = nearestStop < 0 ? nearestStop + lapSize
      : nearestStop > lastStop ? nearestStop - lapSize
        : nearestStop
    element.scrollTo({ top: stop * element.clientHeight, behavior })
  }

  return (
    <main className="about-page" style={{ '--about-background': `url(${background})`, '--about-texture': `url(${texture})` }}>
      <div className="about-scroll" ref={scroller} onScroll={updateScroll} tabIndex={0} aria-label="Scroll through my experience">
        <div className="about-sticky">
          <div className="about-frame">
            <h1 className="about-heading"><span>ABOUT</span>{' '}<span>ME</span></h1>
            <ExperienceOrbit rotation={rotation} active={active} progress={progress} onSelect={selectExperience} />
            <p className="about-scroll-prompt">scroll to see my experience.</p>
            <a className="about-back" href={homeHref} aria-label="Back to home">←</a>
            <ExperienceCard experience={experiences[active]} />
          </div>
        </div>
        <div className="about-scroll-track" aria-hidden="true">
          {Array.from({ length: lastStop + 1 }, (_, stop) => <div className="about-scroll-stop" key={stop} />)}
        </div>
      </div>
    </main>
  )
}
