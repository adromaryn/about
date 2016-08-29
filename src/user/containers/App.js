"use strict";

import	React,	{	Component	}	from	'react'
import	{	bindActionCreators	}	from	'redux'
import	{	connect	}	from	'react-redux'
import	{	IndexLink , Link	}	from	'react-router'
import	Main	from	'../components/Main'
import Contacts from '../components/Contacts'
import	*	as	mainActions	from	'../actions/MainActions'
import	*	as	contactsActions	from	'../actions/ContactsActions'
import	*	as	projectsActions	from	'../actions/ProjectsActions'
import cookie from 'react-cookie';
import 'whatwg-fetch';
const addIco = require('../add.png')

class	App	extends	Component	{

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
    } else if (this.props.children.type === Contacts) {
      children = React.cloneElement(
        this.props.children,
        {
          telegram: this.props.contacts.telegram,
          setTelegram: this.props.contactsActions.setTelegram
        }
      )
    } else {
      children = React.cloneElement(
        this.props.children,
        {
          title: this.props.projects.title,
          content: this.props.projects.content,
          projects: this.props.projects.projects,
          setTitle: this.props.projectsActions.setTitle,
          setContent: this.props.projectsActions.setContent,
          setProjects: this.props.projectsActions.setProjects
        }
      )
    }

    var projectsItems = this.props.projects.projects.map((item, index) => {
      return (
        <div key = { index }>
          <Link
            to= {`project/${index}`}
            activeClassName='active' >
            Проект: {item.title}
          </Link>
        </div>
      )
    });

    return	(
      <div>
        <aside>
          <IndexLink to='/' activeClassName='active'>Профиль</IndexLink>
          <Link to='contacts' activeClassName='active'>Контакты</Link>
          <Link to='new'
            activeClassName='active'
            className = { window.userStatus === 'owner' ? '' : 'hidden'}>
              <img src={addIco} />
              <span>Добавить проект</span>
          </Link>
          {projectsItems}
        </aside>
        <main>
          <header>
            <a
              onClick={window.userStatus ? (::this.logOut) : ::this.logIn }>
              {window.userStatus ? 'Logout' : 'Login'}
            </a>
          </header>
          { children }
          <a
            href = 'https://github.com/adromaryn'
            className = 'author minLink'
            target = '_blank'>
            Yakugo, 2016, by adromaryn (Igor Frolov)
          </a>
        </main>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    main: state.main,
    contacts: state.contacts,
    projects: state.projects
  }
}

function mapDispatchToProps(dispath) {
  return {
    mainActions: bindActionCreators(mainActions, dispath),
    contactsActions: bindActionCreators(contactsActions, dispath),
    projectsActions: bindActionCreators(projectsActions, dispath)
  }
}

export	default	connect(mapStateToProps, mapDispatchToProps)(App)
