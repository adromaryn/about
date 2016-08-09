"use strict"

import	'babel-polyfill'
import	React	from	'react'
import	{	render	}	from	'react-dom'
import	{	Provider	}	from	'react-redux'
import	{	Router,	Route,	IndexRoute,	hashHistory	}	from	'react-router'
import	App	from	'./containers/App'
import	Login	from	'./components/Login'
import	Nickname	from	'./components/Nickname'
import	Password	from	'./components/Password'
import	Question	from	'./components/Question'
import	Name	from	'./components/Name'
import	About	from	'./components/About'
import	Avatar	from	'./components/Avatar'
import	configureStore	from	'./store/configureStore'
require('./style.scss')

const	store	=	configureStore()

render (
  <Provider store = {store} >
    <Router history = {hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute
          component={Login}/>
        <Route path='nick' component={Nickname} />
        <Route path='password' component={Password} />
        <Route path='question' component={Question} />
        <Route path='name' component={Name} />
        <Route path='about' component={About} />
        <Route path='avatar' component={Avatar} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
