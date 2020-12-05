import React, { useEffect } from "react"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { gsap, TimelineLite, CSSPlugin, ScrollTrigger, Power4 } from "gsap/all"
import Logo from "../assets/logo.svg"
import MenuItem from "../components/menu-item"
import Landing from "../components/landing"
import Skills from "../components/skills"
import social from "../data/social.json"
import "../scss/styles.scss"

library.add(fab)
gsap.registerPlugin(CSSPlugin, ScrollTrigger)

const Home = () => {
  const timeline = new TimelineLite({ paused: true })

  useEffect(() => {
    const menuItemAnimation =
      window.outerWidth > 1024
        ? { x: -150, ease: Power4.easeOut }
        : { y: -150, ease: Power4.easeOut }

    timeline
      // Logo.
      .from(
        "#logo svg",
        { opacity: 0, scale: 0, rotate: -180, duration: 1.3 },
        0
      )
      // Picture.
      .from("#picture", { y: -300, opacity: 0, duration: 1.5 }, 0.5)
      // Content.
      .from("#content", { y: 300, opacity: 0, duration: 1.5 }, 0.7)
      // Menu items.
      .staggerFrom(".menu-item", 1, menuItemAnimation, 0.2)
      // Skill.
      .from(".skill", { opacity: 0, duration: 1 }, 0)
      // Skill bars.
      .staggerFrom(".skill-content li", 1, { opacity: 0 }, 0.3)
      // Skill progresses.
      .staggerFrom(".skill-progress", 1, { width: 0, x: -100 }, 0.3)
      .play()
  }, [timeline])

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
        <div className="App">
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
            <Landing />
            <Skills />
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
