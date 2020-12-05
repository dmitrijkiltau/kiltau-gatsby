import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

export default MenuItem
