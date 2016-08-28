"use strict";

import	React,	{	Component	}	from	'react';
import	{	Link	}	from	'react-router';
import cookie from 'react-cookie';
import 'whatwg-fetch';
const NotificationSystem = require('react-notification-system');

export	default	class	NewProject extends	Component	{

  _addNotification(msg, level) {
    this._notificationSystem.addNotification({
      message: msg,
      level: level
    });
  };

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  };

  addProject() {
    fetch(
      '/projects',
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          token: cookie.load('token'),
          title: this.props.title,
          content: this.props.content
        })
      }
    )
      .then(result => {
        if (result.status == 200) {
          this.props.setTitle('');
          this.props.setContent('');
          return result.json();
        }
        else if (result.status == 400) {
          this._addNotification('Заголовок и описание проекта не могут быть пустыми', 'error');
          return null;
        } else {
          this._addNotification('Не удалось создать проект', 'error');
          return null;
        }
      })
      .then( result => {
        if (result) this.props.setProjects(result.projects);
      })
  }

  onTitleChange(e) {
    this.props.setTitle(e.target.value);
  }

  onContentChange(e) {
    this.props.setContent(e.target.value);
  }

  render()	{
    return	(
      <div id="new-project">
        <h2>Новый проект</h2>
        <input
          type='text'
          name='title'
          value = { this.props.title }
          onChange = { ::this.onTitleChange } />
        <br />
        <textarea
          name = 'content'
          value = { this.props.content }
          onChange = { ::this.onContentChange } />
        <button
          className="default-button"
          onClick = { ::this.addProject }>
          Добавить проект
        </button>
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}
