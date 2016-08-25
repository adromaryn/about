"use strict";

import	React,	{	Component	}	from	'react';
import	{	Link	}	from	'react-router';
const tgIcon = require('../telegram.png');
import cookie from 'react-cookie';
import 'whatwg-fetch';

export	default	class	Contacts	extends	Component	{

  telegramDelete() {
    fetch(
      '/users/contacts/telegram/reg',
      {
        method: 'delete',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          token: cookie.load('token')
        })
      }
    )
      .then(result => {
        if (result.status == 200){
          this.props.setTelegram('');
        }
      });
  }

  telegramConfirm() {
    fetch(
      '/users/contacts/telegram/reg',
      {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          token: cookie.load('token')
        })
      }
    )
      .then(result => {
        if (result.status == 200){
          return result.json();
        } else {
          return null;
        }
      })
      .then(result => {
        if (result) {
          window.open(`https://telegram.me/YakugoBot?start=${result.token}`);
          fetch(
            `/users/contacts/telegram/${result.token}`,
            {
              method: 'get',
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  'x-access-token': cookie.load('token')
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
                this.props.setTelegram(result.telegram);
              }
            });
        }
      });
  }

  render()	{
    return	(
      <div id='contacts'>
        <div className='contact'>
          <img src = { tgIcon } />
          <a
            className = { this.props.telegram === '' ? 'hidden':''}
            href = {`https://telegram.me/${this.props.telegram}`}
            target="_blank">
              {`https://telegram.me/${this.props.telegram}`}
          </a>
          <button
            className = { window.userStatus === 'owner' ? '':'hidden'}
            onClick= { this.props.telegram === '' ? (::this.telegramConfirm) : ::this.telegramDelete }>
            { this.props.telegram === '' ? 'Привязать':'Отвязать' }
          </button>
        </div>
      </div>
    )
  }
}
