"use strict";

import	React,	{	Component	}	from	'react'
import	{	Link	}	from	'react-router'
import 'whatwg-fetch';
import cookie from 'react-cookie';
const tgIcon = require('../../telegram.png');

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
        if (result.status == 'Login successful!'){
          cookie.save('token', result.token, { path: '/' });
          window.location = '/';
        }
      });
  };

  telegramSignIn() {
    fetch(
      '/auth/telegram',
      {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      }
    )
      .then(result => {
        if (result.status == 200){
          return result.json();
        } else {
          window.location.href = '/';
        }
      })
      .then(result => {
        if (result) {
          window.open(`https://telegram.me/YakugoBot?start=${result.token}`);
          fetch(
            `/auth/telegram/${result.token}`,
            {
              method: 'get',
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
            }
          )
            .then(result => {
              if (result.status == 200) {
                return result.json();
              } else {
                return null;
              }
            })
            .then(result => {
              if (result) {
                cookie.save('token', result.token, { path: '/' });
                window.location = '/';
              }
            });
        }
      });
  }
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
        <div className='log-in-icons'>
          <span>Войти с помощью:</span>
          <img src= { tgIcon } onClick = { ::this.telegramSignIn }/>
        </div>
      </div>
    )
  }
}
