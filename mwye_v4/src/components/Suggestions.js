import React from 'react'
//presentational component
const Suggestions = (props) => {
  const options = props.results.map(r =>(
    <li key={r.ndbno}>
      {r.name}
    </li>

  ))

  return <ul>{options}</ul>
}

export default Suggestions