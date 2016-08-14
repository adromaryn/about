"use strict";

import	React,	{	Component	}	from	'react'
import	{	bindActionCreators	}	from	'redux'
import	{	connect	}	from	'react-redux'
import	{	Link	}	from	'react-router'
import	Login	from	'../components/Login'
import	*	as	loginActions	from	'../actions/LoginActions'
import	*	as	registrationActions	from	'../actions/RegistrationActions'

export	default	class	App	extends	Component	{

  render()	{

    var children;

    if (this.props.children.type === Login) {
      children = React.cloneElement(
        this.props.children,
        {
          nick: this.props.login.login,
          password: this.props.login.passwordLogin,
          setLogin: this.props.loginActions.setLogin,
          setPassword: this.props.loginActions.setPassword
        }
      )
    } else {
      children = React.cloneElement(
        this.props.children,
        {
          nick: this.props.registration.nick,
          password: this.props.registration.password,
          confirmation: this.props.registration.passwordConfirmation,
          question: this.props.registration.question,
          yourQVisible: this.props.registration.yourQVisible,
          yourQuestion: this.props.registration.yourQuestion,
          answer: this.props.registration.answer,
          name: this.props.registration.name,
          resume: this.props.registration.resume,
          about: this.props.registration.about,
          avatar: this.props.registration.avatar,
          setNick: this.props.registrationActions.setNick,
          setPassword: this.props.registrationActions.setPassword,
          setConfirmation: this.props.registrationActions.setConfirmation,
          setQuestion: this.props.registrationActions.setQuestion,
          setYourQuestionVisibility: this.props.registrationActions.setYourQuestionVisibility,
          setYourQuestion: this.props.registrationActions.setYourQuestion,
          setName: this.props.registrationActions.setName,
          setAnswer: this.props.registrationActions.setAnswer,
          setResume: this.props.registrationActions.setResume,
          setAbout: this.props.registrationActions.setAbout,
          setAvatar: this.props.registrationActions.setAvatar
        }
      )
    }

    return	(
      <div>
        <header>
        <div id="auth-buttons">
          <Link to='/'>Войти</Link>
        <Link to='/nick'>Регистрация</Link>
        </div>
        </header>
        <h1>Yakugo</h1>
        { children }
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    login: state.login,
    registration: state.registration
  }
}

function mapDispatchToProps(dispath) {
  return {
    loginActions: bindActionCreators(loginActions, dispath),
    registrationActions: bindActionCreators(registrationActions, dispath)
  }
}

export	default	connect(mapStateToProps, mapDispatchToProps)(App)
