"use strict";

import	React,	{	Component	}	from	'react';
import	{	Link	}	from	'react-router';
import SkyLight from 'react-skylight';
const NotificationSystem = require('react-notification-system');
require('croppie');
import 'whatwg-fetch';
const avaUrl = require('../../default_ava.jpg');
var cropImage = avaUrl;
var croppieContainer;

export	default	class	Avatar	extends	Component	{

  _addNotifications(messages, level) {
    messages.forEach(msg => {
      this._notificationSystem.addNotification({
        message: msg,
        level: level
      });
    });
  };

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  };


  signUpClick(e) {
    let question = this.props.question == "Свой вопрос" ? this.props.yourQuestion : this.props.question

    fetch(
      '/auth',
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          username: this.props.nick,
          password: this.props.password,
          passwordConfirmation: this.props.confirmation,
          question: question,
          answer: this.props.answer,
          name: this.props.name,
          resume: this.props.resume,
          about: this.props.about,
          avatar: this.props.avatar
        })
      }
    )
      .then(result => {
        return result.json();
      })
      .then(result => {
        if (result.errors) {
          this._addNotifications(result.errors, 'error');
        } else if (result.status == 'Registration Successful!'){
          this._addNotifications(['Вы зарегистрированы!',], 'success');
          setTimeout(()=>{
            window.location = '/auth';
          }, 3000);
        }
      });
  };

  onAvaChange(e) {
    var files = e.target.files;
    if (files.length > 0) {
      var file = files[0];
      cropImage = URL.createObjectURL(file);
      this.refs.avaDialog.show();
    }
  };

  onCropConfirmClick(e) {
    var setAvatar = this.props.setAvatar;
    var dialog = this.refs.avaDialog;
    croppieContainer.result({
      type: 'canvas',
      size: 'viewport',
      format:'png'}).then(function(image) {
        setAvatar(image);
        document.getElementById('avatar-input').value = "";
        dialog.hide();
    });
  }

  _executeAfterModalOpen(){
    croppieContainer = new Croppie(document.getElementById('cropImage'), {
        viewport: { width: 200, height: 200, type: 'circle' },
        showZoomer: false});
    croppieContainer.bind({url: cropImage});
  };


  resetAvatar() {
    this.props.setAvatar(undefined);
  }

  render()	{

    var avaStyle = {
      backgroundImage:  `url(${this.props.avatar == undefined ? avaUrl : this.props.avatar})`
    };

    var cropDialogStyles = {
      position: 'absolute',
      minHeight: '430px'
    };

    var src;

    if (this.props.avatar){
      src = this.props.avatar;
    } else {
      src = avaUrl;
    }

    return	(

      <div>
        <p>Шаг 6/6: поставьте своё фото на аватар</p>
        <div id="avatar"
          style= { avaStyle }>
          <input
            type="file"
            name="avatar"
            size="chars"
            id="avatar-input"
            onChange={ ::this.onAvaChange }></input>
        </div>
        <div
          className={ this.props.avatar ? 'minLink' : 'hidden' }
          onClick= {::this.resetAvatar } >
          <a>Очистить аватар</a></div>
        <nav>
          <Link to='/about' className="left" >Назад</Link>
          <a className="right" onClick = { ::this.signUpClick }>Вперёд!</a>
        </nav>
        <SkyLight
          hideOnOverlayClicked
          ref="avaDialog"
          dialogStyles={cropDialogStyles}
          afterOpen={this._executeAfterModalOpen}>
          <div
            id = 'cropImage'
            className = 'croppie-container'/>
          <button
            onClick={ this.onCropConfirmClick.bind(this)}
            className="default-button">Обрезать</button>
        </SkyLight>
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}
