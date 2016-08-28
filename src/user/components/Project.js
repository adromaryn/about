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

  render()	{
    var project = (this.props.projects)[this.props.params.project];
    var title = project.title;
    var content = project.content;
    return	(
      <div id="project">
        <h2>{ title }</h2>
        { content }
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}
