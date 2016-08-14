"use strict";

import	React,	{	Component	}	from	'react'
import	{	Link	}	from	'react-router'
import 'whatwg-fetch';

export	default	class	Login	extends	Component	{
  onLoginInputChange(e) {
    this.props.setLogin(e.target.value)
  }
  onPasswordInputChange(e) {
    this.props.setPassword(e.target.value)
  }
  signInClick(e) {
    let question = this.props.question == "Свой вопрос" ? this.props.yourQuestion : this.props.question

    fetch(
      '/auth/login',
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          username: this.props.nick,
          password: this.props.password
        })
      }
    )
      .then(result => {
        return result.json();
      })
      .then(result => {
        alert(result.status);
        if (result.status == 'Login Successful!'){
          window.location = '/';
        }
      });
  };
  render()	{
    return	(
      <div>
        <input
          type="text"
          name="login"
          placeholder="Никнейм"
          value={ this.props.login }
          onChange = { ::this.onLoginInputChange}
          ></input>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={ this.props.password }
          onChange = { ::this.onPasswordInputChange}></input>
        <nav>
          <a onClick = { ::this.signInClick }>Войти</a>
        </nav>
      </div>
    )
  }
}
