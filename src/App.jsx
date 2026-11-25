import lotusBitmap from '../assets/flower/lotus_bitmap.png'
import lotusRealistic from '../assets/flower/lotus_realistic.png'
import lettering from '../assets/lettering/portfolio.png'
import background from '../assets/background/background.png'
import cat from '../assets/home/cat.png'
import flower from '../assets/home/flower.png'
import connectors from '../assets/home/lotus-connectors.svg'
import navigationRule from '../assets/home/navigation-rule.svg'
import './App.css'

const aboutHref = `${import.meta.env.BASE_URL}about/`

const email = 'madisonblin05@gmail.com'

const flowerWindows = [
  { x: 478, y: 68, width: 312, height: 391, crop: [-63.14, -73.48, 261.22, 295.29] },
  { x: 725, y: 404, width: 318, height: 182, crop: [-139.62, -342.47, 256.29, 634.39] },
  { x: 779, y: 660, width: 216, height: 211, crop: [-230.56, -419.1, 377.31, 547.2], label: 'resume.txt' },
  { x: 384, y: 326, width: 228, height: 244, crop: [-45.18, -219.05, 357.46, 475.14], label: 'projects.exe', href: '#projects' },
  { x: 577, y: 213, width: 295, height: 165, crop: [-100.34, -264.42, 276.27, 699.75], label: 'aboutme.md', href: aboutHref },
]

const markers = [
  { x: 863, y: 261, width: 84, height: 69 },
  { x: 577, y: 517, width: 84, height: 69 },
  { x: 442, y: 690, width: 81, height: 33 },
  { x: 708, y: 651, width: 110, height: 40 },
]

const heatmapColumns = [
  [0, '...0000'], [14.93, '0000000'], [29.85, '0000000'],
  [44.78, '0000000'], [59.7, '000000.'], [80.43, '......0'],
  [95.36, '0000000'], [110.28, '0000000'], [125.21, '0000000'],
  [140.14, '1134000'], [155.06, '11.....'], [179.11, '..22000'],
  [194.03, '0000000'], [208.96, '0000022'], [223.89, '0000000'],
  [238.81, '0000...'], [262.86, '....110'], [277.78, '0004000'],
  [292.71, '0000000'], [307.64, '0400400'], [322.56, '0440111'],
]

function stagePosition(x, y, width, height) {
  return { '--x': x - 280, '--y': y - 65, '--w': width, '--h': height }
}

function FlowerWindow({ x, y, width, height, crop, label, href }) {
  const [left, top, imageWidth, imageHeight] = crop
  const Window = href ? 'a' : 'div'

  return (
    <Window className="flower-window stage-item" href={href} style={stagePosition(x, y, width, height)}>
      {label && <span className="window-label">{label}</span>}
      <span className={label ? 'window-pane' : 'window-pane window-pane-muted'} aria-hidden="true">
        <img src={lotusRealistic} alt="" style={{ left: `${left}%`, top: `${top}%`, width: `${imageWidth}%`, height: `${imageHeight}%` }} />
      </span>
    </Window>
  )
}

function FlowerComposition() {
  return (
    <section className="flower-stage" id="projects" aria-label="Projects and lotus artwork">
      <img className="lotus-bitmap stage-item" src={lotusBitmap} alt="A dotted pink lotus revealed through overlapping windows" style={stagePosition(281.8, -123.64, 814.654, 1012.025)} />
      {markers.map(({ x, y, width, height }) => (
        <span key={x} className="marker stage-item" aria-hidden="true" style={stagePosition(x, y, width, height)} />
      ))}
      <span className="coordinate stage-item" aria-hidden="true" style={stagePosition(464, 698)}>26.1294827141</span>
      <span className="coordinate stage-item" aria-hidden="true" style={stagePosition(661, 826)}>491.29201093</span>
      <img className="connector-lines stage-item" src={connectors} width="659.129" height="561.903" alt="" style={stagePosition(384, 231.1, 659.129, 561.903)} />
      {flowerWindows.map((window) => <FlowerWindow key={window.x} {...window} />)}
    </section>
  )
}

function LeetCode() {
  return (
    <aside className="leetcode" aria-label="LeetCode">
      <p>leetcode</p>
      <div className="heatmap" role="img" aria-label="LeetCode heatmap illustration">
        {heatmapColumns.map(([x, cells]) => (
          <div className="heatmap-column" key={x} style={{ '--column': x }}>
            {Array.from(cells, (level, row) => <span key={row} data-level={level} />)}
          </div>
        ))}
      </div>
      <p className="leetcode-caption">keeping skills sharp!</p>
    </aside>
  )
}

function App() {
  return (
    <div className="site" style={{ '--background-art': `url(${background})` }}>
      <main className="home">
        <nav className="navigation" aria-label="Main navigation">
          <a href={aboutHref}>about me</a>
          <a href="#projects">projects</a>
          <span>resume</span>
          <a href="#connect">connect</a>
          <img className="navigation-rule" src={navigationRule} width="617" height="2" alt="" />
        </nav>

        <h1 className="site-title">
          <span className="visually-hidden">Madison Lin Portfolio</span>
          <span className="lettering lettering-name" aria-hidden="true"><img src={lettering} alt="" /></span>
          <span className="lettering lettering-portfolio" aria-hidden="true"><img src={lettering} alt="" /></span>
        </h1>

        <section className="about" id="about" aria-label="About me">
          <p>aspiring software engineer</p>
          <p>creative technologist</p>
          <p>cat owner</p>
        </section>

        <FlowerComposition />
        <LeetCode />

        <footer className="contact" id="connect">
          <p>Connect with me:</p>
          <ul>
            <li><a href="https://github.com/madibl">GitHub</a></li>
            <li>LinkedIn</li>
            <li><a href={`mailto:${email}`}>{email}</a></li>
          </ul>
        </footer>

        <div className="doodle cat" aria-hidden="true"><span><img src={cat} alt="" /></span></div>
        <div className="doodle doodle-flower doodle-flower-upper" aria-hidden="true"><span><img src={flower} alt="" /></span></div>
        <div className="doodle doodle-flower doodle-flower-lower" aria-hidden="true"><span><img src={flower} alt="" /></span></div>
      </main>
    </div>
  )
}

export default App
