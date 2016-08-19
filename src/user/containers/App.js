"use strict";

import	React,	{	Component	}	from	'react'
import	{	bindActionCreators	}	from	'redux'
import	{	connect	}	from	'react-redux'
import	{	IndexLink , Link	}	from	'react-router'
import	Main	from	'../components/Main'
import	*	as	mainActions	from	'../actions/MainActions'
import	*	as	contactsActions	from	'../actions/ContactsActions'
import cookie from 'react-cookie';
import 'whatwg-fetch';

export	default	class	App	extends	Component	{

  logOut() {
    cookie.remove('token', { path: '/' });
    fetch(
      '/auth/logout',
      {
        method: 'get',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    )
      .then(() => {
        window.location.href='/auth';
      });
  };

  logIn() {
    cookie.remove('token', { path: '/' });
    window.location.href='/auth';
  };

  render()	{
    var children;

    if (this.props.children.type === Main) {
      children = React.cloneElement(
        this.props.children,
        {
          nick: this.props.main.nick,
          name: this.props.main.name,
          nameCached: this.props.main.nameCached,
          resume: this.props.main.resume,
          resumeCached: this.props.main.resumeCached,
          about: this.props.main.about,
          aboutCached: this.props.main.aboutCached,
          avatar: this.props.main.avatar,
          setAvatar: this.props.mainActions.setAvatar,
          setName: this.props.mainActions.setName,
          setCachedName: this.props.mainActions.setCachedName,
          setResume: this.props.mainActions.setResume,
          setCachedResume: this.props.mainActions.setCachedResume,
          setAbout: this.props.mainActions.setAbout,
          setCachedAbout: this.props.mainActions.setCachedAbout
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
          <header>
            <a
              onClick={window.userStatus ? (::this.logOut) : ::this.logIn }>
              {window.userStatus ? 'Logout' : 'Login'}
            </a>
          </header>
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
