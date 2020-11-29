import React, { useEffect, createRef } from "react"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { gsap, TimelineLite, CSSPlugin, Power4 } from "gsap/all"
import Logo from "../assets/logo.svg"
import social from "../data/social.json"
import "../scss/styles.scss"

library.add(fab)
gsap.registerPlugin(CSSPlugin)

const MenuItem = props => {
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

const Home = () => {
  const timeline = new TimelineLite({ paused: true })

  const appRef = createRef()
  const pictureRef = createRef()
  const contentRef = createRef()

  const menuItemAnimation =
    window.outerWidth > 420
      ? { x: -150, ease: Power4.easeOut }
      : { y: -150, ease: Power4.easeOut }

  useEffect(() => {
    timeline
      // Logo animation.
      .fromTo(
        "#logo svg",
        { opacity: 0, scale: 0, rotate: -180 },
        { opacity: 1, scale: 1, rotate: 0, ease: Power4.easeOut, duration: 2 }
      )
      // Menu items animation.
      .staggerFrom(".menu-item", 1, menuItemAnimation, 0.2)
      // Picture animation.
      .fromTo(
        pictureRef.current,
        { opacity: 0, y: -1000, delay: 1 },
        { opacity: 1, y: 0, ease: Power4.easeOut, duration: 3 },
        0
      )
      // Content animation.
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 2000, delay: 1 },
        { opacity: 1, y: 0, ease: Power4.easeOut, duration: 3 },
        0
      )
      // Hide scrollbar while animation is running.
      .fromTo(appRef.current, { overflow: "hidden" }, { overflow: "auto" })
      .play()
  })

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
        <div className="App" ref={appRef}>
          <Helmet
            title={data.site.siteMetadata.title}
            description={data.site.siteMetadata.description}
          />

          <header>
            <div id="logo">
              <Logo />
            </div>
          </header>

          <nav>
            <div id="menu">
              {social.menu.map(item => (
                <MenuItem key={item.name} item={item} />
              ))}
            </div>
          </nav>

          <main>
            <div id="landing">
              <div id="picture">
                <img src={"/images/ich.jpg"} alt="Dima" ref={pictureRef} />
              </div>

              <div id="content" ref={contentRef}>
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
            </div>
          </main>

          <footer>
            <div id="footer">
              {social.footer.map(item => (
                <MenuItem key={item.name} item={item} />
              ))}
            </div>
          </footer>
        </div>
      )}
    />
  )
}

export default Home
