import React, { useEffect } from "react"
import skills from "../data/skills.json"

const Skills = () => {
  useEffect(() => {
    document.querySelectorAll(".skill-progress").forEach(element => {
      element.style.width = element.dataset.progress + "%"
    })
  }, [])

  return (
    <section id="skills">
      <h2 className="section-name">{skills.name}</h2>

      {skills.categories.map(category => (
        <div className="category" key={category.name}>
          <h1 className="category-name">{category.name}</h1>

          {category.skills.map(skill => (
            <div className="skill" key={skill.name}>
              <h1 className="skill-name">{skill.name}</h1>
              <ul className="skill-content">
                {skill.contents.map((content, index) => (
                  <li key={index}>
                    <div className="skill-bar" />
                    <div
                      className="skill-progress"
                      data-progress={content.progress}
                    />
                    <span className="skill-content-name">{content.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

export default Skills
