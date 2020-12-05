import React from "react"

const Landing = () => {
  return (
    <div id="landing">
      <div id="picture">
        <img src={"/images/ich.jpg"} alt="Dima" />
      </div>

      <div id="content">
        <h1>
          Hi! Mein Name ist <s>Dmitrij Kiltau</s> Dima.
        </h1>
        <p>
          Angefangen als Hobby Web- & App-Entwickler bin ich mittlerweile in
          einer Ausbildung als Fachinformatiker für Anwendungsentwicklung.
          Außerdem probiere ich mich etwas an UI & UX Design oder drehe &
          schneide hin und wieder (Musik-)Videos für Freunde.
        </p>
        <p>
          Hauptberuflich bin ich eher im Bereich Web-Entwicklung (HTML, CSS, JS,
          PHP & MySQL) unterwegs. Privat wiederum im Bereich der App-Entwicklung
          (Kotlin, Flutter/Dart).
        </p>
      </div>
    </div>
  )
}

export default Landing
