"use strict";

import	React,	{	Component	}	from	'react';
import	{	Link	}	from	'react-router';
import cookie from 'react-cookie';
import 'whatwg-fetch';
const NotificationSystem = require('react-notification-system');

export	default	class	Project	extends	Component	{

  _addNotification(msg, level) {
    this._notificationSystem.addNotification({
      message: msg,
      level: level
    });
  };

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  };

  deleteProject(e) {
    fetch(
      `/projects/${this.props.params.project}`,
      {
        method: 'delete',
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
        if (result.status === 200) {
          let p = this.props.projects;
          p.splice(this.props.params.project, 1);
          this.props.setProjects(p);
        }
      })
  }

  render()	{
    var project = (this.props.projects)[this.props.params.project];
    var title = project.title;
    var content = project.content;
    return	(
      <div id="project">
        <h2>{ title }</h2>
        { content }
        <br />
        <a
          href='#'
          className = {window.userStatus === 'owner' ? '' : 'hidden'}
          onClick={ ::this.deleteProject }>
          Удалить проект
        </a>
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}
