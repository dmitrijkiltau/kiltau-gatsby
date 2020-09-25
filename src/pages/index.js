import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { gsap, TimelineLite, CSSPlugin, Power1 } from "gsap/all"
import Logo from "../assets/logo.svg"
import social from "../data/social.json"
import "../scss/styles.scss"

library.add(fab)
gsap.registerPlugin(CSSPlugin)

function MenuItem(props) {
  return (
    <a
      href={props.item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="menu-item"
    >
      <span className="icon">
        <FontAwesomeIcon icon={["fab", props.item.icon]} />
      </span>
      {props.item.name}
    </a>
  )
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.timeline = new TimelineLite({ paused: true })
    this.appRef = React.createRef()
    this.pictureRef = React.createRef()
    this.contentRef = React.createRef()
  }

  componentDidMount() {
    this.timeline
      // picture animation
      .fromTo(
        this.pictureRef.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, ease: Power1.easeOut, duration: 2 },
        0
      )
      // content animation
      .fromTo(
        this.contentRef.current,
        { opacity: 0, y: 200 },
        { opacity: 1, y: 0, ease: Power1.easeOut, duration: 2 },
        0
      )
      // overflow fix animation
      .fromTo(this.appRef.current, { overflow: "hidden" }, { overflow: "auto" })
      .play()
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                title
                description
              }
            }
          }
        `}
        render={data => (
          <div className="App" ref={this.appRef}>
            <Helmet
              title={data.site.siteMetadata.title}
              description={data.site.siteMetadata.description}
            />

            <header>
              <div id="logo">
                <Logo />
              </div>
            </header>

            <menu>
              {social.menu.map(item => (
                <MenuItem key={item.name} item={item} />
              ))}
            </menu>

            <main>
              <div id="picture">
                <img src={"/images/ich.jpg"} alt="Dima" ref={this.pictureRef} />
              </div>

              <div id="content" ref={this.contentRef}>
                <h1>
                  Hi! Mein Name ist <s>Dmitrij Kiltau</s> Dima.
                </h1>
                <p>
                  Angefangen als Hobby Web- & App-Entwickler bin ich
                  mittlerweile in einer Ausbildung als Fachinformatiker für
                  Anwendungsentwicklung. Außerdem probiere ich mich etwas an UI
                  & UX Design oder drehe & schneide hin und wieder
                  (Musik-)Videos für Freunde.
                </p>
                <p>
                  Hauptberuflich bin ich eher im Bereich Web-Entwicklung (HTML,
                  CSS, JS, PHP & MySQL) unterwegs. Privat wiederum im Bereich
                  der App-Entwicklung (Kotlin, Flutter/Dart).
                </p>
              </div>
            </main>

            <footer>
              {social.footer.map(item => (
                <MenuItem key={item.name} item={item} />
              ))}
            </footer>
          </div>
        )}
      />
    )
  }
}

export default Home
