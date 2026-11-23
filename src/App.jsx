import lotusBitmap from '../assets/flower/lotus_bitmap.png'
import lotusRealistic from '../assets/flower/lotus_realistic.png'
import lettering from '../assets/lettering/portfolio.png'
import cat from '../assets/little_doodles/cat.png'
import flower from '../assets/little_doodles/flower.png'
import './App.css'

const repository = 'https://github.com/madibl/MadisonLin_Portfolio'

const flowerWindows = [
  { x: 388, y: 477.88, width: 298, height: 176, offsetX: -29.52, offsetY: -292.93, scaleX: 258.73, scaleY: 555.09, label: 'project2.exe' },
  { x: 686, y: 120.88, width: 321, height: 240, offsetX: -120.56, offsetY: -107.2, scaleX: 253.89, scaleY: 481.08, label: 'aboutme.md', href: '#about' },
  { x: 630, y: 576.88, width: 116, height: 207, offsetX: -301.63, offsetY: -347.61, scaleX: 702.59, scaleY: 557.77 },
  { x: 639, y: 423.88, width: 339, height: 162, offsetX: -100.29, offsetY: -352.03, scaleX: 240.41, scaleY: 712.71 },
  { x: 354, y: 219.88, width: 384, height: 236, offsetX: -14.32, offsetY: -150.97, scaleX: 212.24, scaleY: 489.23 },
  { x: 809, y: 742.88, width: 249, height: 224, offsetX: -210.84, offsetY: -388.52, scaleX: 327.31, scaleY: 515.44, label: 'project3.exe' },
  { x: 734, y: 263, width: 183, height: 205, offsetX: -234.43, offsetY: -194.29, scaleX: 445.36, scaleY: 563.21 },
]

function FlowerComposition() {
  // The stage maps the Figma coordinates to a single responsive canvas.
  const stage = { x: 320, y: 117, width: 750, height: 850 }

  return (
    <section className="flower-stage" id="projects" aria-label="Projects and lotus artwork">
      <img className="lotus-bitmap" src={lotusBitmap} alt="A dotted lotus with pink petals revealed through overlapping windows" />
      {flowerWindows.map(({ x, y, width, height, offsetX, offsetY, scaleX, scaleY, label, href }) => (
        <div
          className="flower-window"
          key={x}
          style={{
            left: `${(x - stage.x) / stage.width * 100}%`,
            top: `${(y - stage.y) / stage.height * 100}%`,
            width: `${width / stage.width * 100}%`,
            height: `${height / stage.height * 100}%`,
          }}
        >
          <img src={lotusRealistic} alt="" style={{ left: `${offsetX}%`, top: `${offsetY}%`, width: `${scaleX}%`, height: `${scaleY}%` }} />
          {href ? <a href={href}>{label}</a> : label && <span>{label}</span>}
        </div>
      ))}
    </section>
  )
}

function App() {
  return (
    <div className="site">
      <main className="home">
        <nav className="navigation" aria-label="Main navigation">
          <a href="#about">about me</a>
          <a href="#projects">projects</a>
          <span>resume</span>
          <a href="#connect">connect</a>
        </nav>

        <h1 className="site-title">
          <span className="visually-hidden">Madison Lin Portfolio</span>
          <span className="lettering lettering-name" aria-hidden="true"><img src={lettering} alt="" /></span>
          <span className="lettering lettering-portfolio" aria-hidden="true"><img src={lettering} alt="" /></span>
        </h1>

        <section className="panel about" id="about" aria-label="About me">
          <p>aspiring software engineer</p>
          <p>creative technology enthusiast</p>
          <p>cat owner</p>
        </section>

        <FlowerComposition />

        <aside className="panel leetcode" aria-label="LeetCode">
          <p>I think it would be cool to have my leetcode heatmap updating up here!</p>
        </aside>

        <footer className="contact" id="connect">
          <section className="panel contact-links" aria-label="Contact">
            <p>Connect with me:</p>
            <ul>
              <li><a href="https://github.com/madibl">github</a></li>
              <li>linkedin</li>
              <li>email</li>
              <li>leetcode</li>
            </ul>
          </section>
          <a className="site-story" href={repository}>how this site was made?</a>
        </footer>

        <div className="decoration" aria-hidden="true">
          <img className="cat" src={cat} alt="" />
          <img className="doodle-flower doodle-flower-upper" src={flower} alt="" />
          <img className="doodle-flower doodle-flower-lower" src={flower} alt="" />
          <span className="outline outline-left" />
          <span className="outline outline-right" />
          <span className="outline outline-bottom" />
          <span className="coordinate coordinate-left">26.1294827141</span>
          <span className="coordinate coordinate-center">491.29201093</span>
          <span className="coordinate coordinate-right">51.183859105</span>
        </div>
      </main>
    </div>
  )
}

export default App
