"use strict";

import	React,	{	Component	}	from	'react'
import	{	bindActionCreators	}	from	'redux'
import	{	connect	}	from	'react-redux'
import	{	IndexLink , Link	}	from	'react-router'
import	Main	from	'../components/Main'
import	*	as	mainActions	from	'../actions/MainActions'
import	*	as	contactsActions	from	'../actions/ContactsActions'

export	default	class	App	extends	Component	{

  render()	{
    var children;

    if (this.props.children.type === Main) {
      children = React.cloneElement(
        this.props.children,
        {
          nick: this.props.main.nick,
          resume: this.props.main.resume,
          avatar: this.props.main.avatar,
          setAvatar: this.props.mainActions.setAvatar
        }
      )
    } else {
      children = this.props.children;
    }

    return	(
      <div>
        <aside>
          <IndexLink to='/' activeClassName='active'>Профиль</IndexLink>
          <Link to='contacts' activeClassName='active'>Контакты</Link>
        </aside>
        <main>
          { children }
        </main>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    main: state.main,
    contacts: state.contacts
  }
}

function mapDispatchToProps(dispath) {
  return {
    mainActions: bindActionCreators(mainActions, dispath),
    contactsActions: bindActionCreators(contactsActions, dispath)
  }
}

export	default	connect(mapStateToProps, mapDispatchToProps)(App)
