"use strict"

import	'babel-polyfill'
import	React	from	'react'
import	{	render	}	from	'react-dom'
import	App	from	'./containers/App'
require('./style.scss')

render (
  <App />,
  document.getElementById('root')
)
