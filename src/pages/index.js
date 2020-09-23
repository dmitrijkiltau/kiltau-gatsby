import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import Logo from "../assets/logo.svg"
import social from "../data/social.json"
import "../scss/styles.scss"

library.add(fab)

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

export default function Home() {
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

          <menu>
            {social.menu.map(item => (
              <MenuItem key={item.name} item={item} />
            ))}
          </menu>

          <main>
            <div id="picture">
              <img src={"/images/ich.jpg"} alt="Dima" />
            </div>

            <div id="content">
              <h1>
                Hi! Mein Name ist <s>Dmitrij Kiltau</s> Dima.
              </h1>
              <p>
                Angefangen als Hobby Web- & App-Entwickler bin ich mittlerweile
                in einer Ausbildung als Fachinformatiker für
                Anwendungsentwicklung. Außerdem probiere ich mich etwas an UI &
                UX Design oder drehe & schneide hin und wieder (Musik-)Videos
                für Freunde.
              </p>
              <p>
                Hauptberuflich bin ich eher im Bereich Web-Entwicklung (HTML,
                CSS, JS, PHP & MySQL) unterwegs. Privat wiederum im Bereich der
                App-Entwicklung (Kotlin, Flutter/Dart).
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
