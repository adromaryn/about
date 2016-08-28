"use strict"

import	'babel-polyfill'
import	React	from	'react'
import	{	render	}	from	'react-dom'
import	{	Provider	}	from	'react-redux'
import	{	Router,	Route,	IndexRoute,	hashHistory	}	from	'react-router'
import	App	from	'./containers/App'
import	Main	from	'./components/Main'
import	Contacts	from	'./components/Contacts'
import	NewProject	from	'./components/NewProject'
import	Project	from	'./components/Project'
import	configureStore	from	'./store/configureStore'
require('./style.scss')

const	store	=	configureStore()

render (
  <Provider store = {store} >
    <Router history = {hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute
          component={Main}/>
        <Route path='contacts' component={Contacts} />
        <Route path='new' component={NewProject} />
        <Route path='project/:project' component={Project} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
