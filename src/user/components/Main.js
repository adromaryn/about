"use strict";

import	React,	{	Component	}	from	'react'
import SkyLight from 'react-skylight';
require('croppie');
var avaUrl = require('../../default_ava.jpg');
var cropImage = avaUrl;
var croppieContainer;
import cookie from 'react-cookie';
import 'whatwg-fetch';

export	default	class	Main	extends	Component	{
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
        fetch(
          '/users/avatar',
          {
            method: 'post',
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
              avatar: image,
              token: cookie.load('token')
            })
          }
        )
          .then(result => {
            if (result.status == 200) {
              setAvatar(image);
            }
          });
        document.getElementById('avatar-input').value = "";
        dialog.hide();
    });
  }

  _executeAfterModalAvaOpen(){
    croppieContainer = new Croppie(document.getElementById('cropImage'), {
        viewport: { width: 200, height: 200, type: 'circle' },
        showZoomer: false});
    croppieContainer.bind({url: cropImage});
  };


  clearAvatar() {
    fetch(
      '/users/avatar',
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
        if (result.status == 200 ) {
          this.props.setAvatar(undefined);
        }
      });
  };

  onNameClick(e) {
    this.refs.nameDialog.show();
  };

  onNameInputChange(e) {
    this.props.setName(e.target.value);
  };

  nameConfirm(e) {
    fetch(
      '/users/name',
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          name: this.props.name,
          token: cookie.load('token')
        })
      }
    )
      .then(result => {
        this.refs.nameDialog.hide();
        if (result.status == 200) {
          this.props.setCachedName(this.props.name);
        } else {
          this.props.setName(this.props.nameCached);
        }
      });
  };

  onResumeClick(e) {
    this.refs.resumeDialog.show();
  };

  onResumeInputChange(e) {
    this.props.setResume(e.target.value);
  };

  resumeConfirm(e) {
    fetch(
      '/users/resume',
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          resume: this.props.resume,
          token: cookie.load('token')
        })
      }
    )
      .then(result => {
        this.refs.resumeDialog.hide();
        if (result.status == 200) {
          this.props.setCachedResume(this.props.resume);
        } else {
          this.props.setResume(this.props.resumeCached);
        }
      });
  };

  onAboutClick(e) {
    this.refs.aboutDialog.show();
  };

  onAboutInputChange(e) {
    this.props.setAbout(e.target.value);
  };

  aboutConfirm(e) {
    fetch(
      '/users/about',
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          about: this.props.about,
          token: cookie.load('token')
        })
      }
    )
      .then(result => {
        this.refs.aboutDialog.hide();
        if (result.status == 200) {
          this.props.setCachedAbout(this.props.about);
        } else {
          this.props.setAbout(this.props.aboutCached);
        }
      });
  };

  render()	{

    var avaStyle = {
      backgroundImage:  `url(${this.props.avatar ? this.props.avatar : avaUrl})`
    };

    var cropDialogStyles = {
      position: 'absolute',
      left: '25%',
      minHeight: '430px',
      width: '470px'
    };
    var textDialogStyles = {
      position: 'absolute',
      left: '25%',
      height: '150px',
      width: '470px'
    };
    var aboutDialogStyles = {
      position: 'absolute',
      left: '25%',
      height: '170px',
      width: '470px'
    };

    return	(
      <div>
        <div id="avatar"
          style= { avaStyle }>
          <input
            type="file"
            name="avatar"
            size="chars"
            id="avatar-input"
            onChange={ ::this.onAvaChange }
            disabled = { window.userStatus != 'owner' }></input>
        </div>
        <a
          className = { window.userStatus === 'owner' && this.props.avatar ? 'minLink' : 'hidden' }
          onClick= { window.userStatus === 'owner' ? (::this.clearAvatar) : ()=>{} }>
          Удалить аватар
        </a>
        <h1
          id="name"
          onClick= { window.userStatus === 'owner' ? (::this.onNameClick) : ()=>{}}>
          { this.props.nameCached === '' ? this.props.nick : this.props.nameCached}
        </h1>
        <h2
          id="resume"
          onClick= { window.userStatus === 'owner' ? (::this.onResumeClick) : ()=>{}}>
          { this.props.resumeCached === '' ? '' : this.props.resumeCached}
        </h2>
        <a
          className = { window.userStatus === 'owner' && this.props.resumeCached == '' ? 'minLink' : 'hidden' }
          onClick= { window.userStatus === 'owner' ? (::this.onResumeClick) : ()=>{} }>
          Добавить описание.
        </a>
        <div id='about-area'>
          <p> { this.props.aboutCached } </p>
          <a
            className = { window.userStatus === 'owner' ? 'minLink' : 'hidden' }
            onClick= { window.userStatus === 'owner' ? (::this.onAboutClick) : ()=>{} }>
            { this.props.aboutCached == '' ? 'Добавить описание' : 'Изменить описание' }
          </a>
        </div>
        <SkyLight
          hideOnOverlayClicked
          ref="avaDialog"
          dialogStyles={cropDialogStyles}
          afterOpen={this._executeAfterModalAvaOpen}>
          <div
            id = 'cropImage'
            className = 'croppie-container'/>
          <button
            onClick={ this.onCropConfirmClick.bind(this)}
            className="default-button">Обрезать</button>
        </SkyLight>
        <SkyLight
          hideOnOverlayClicked
          ref="nameDialog"
          dialogStyles={textDialogStyles}>
          Изменение имени ( если имя пустое, на странице будет показан никнейм).
          <br />
          <input
            type='text'
            id='name-input'
            value = { this.props.name }
            onChange = { ::this.onNameInputChange }/>
          <button
            onClick={ this.nameConfirm.bind(this)}
            className="default-button">Изменить</button>
        </SkyLight>
        <SkyLight
          hideOnOverlayClicked
          ref="resumeDialog"
          dialogStyles={textDialogStyles}>
          Пару слов о своей деятельности.
          <br />
          <input
            type='text'
            id='resume-input'
            value = { this.props.resume }
            onChange = { ::this.onResumeInputChange }/>
          <button
            onClick={ this.resumeConfirm.bind(this)}
            className="default-button">Изменить</button>
        </SkyLight>
        <SkyLight
          hideOnOverlayClicked
          ref="aboutDialog"
          dialogStyles={aboutDialogStyles}>
          Раздел "о себе".
          <br />
          <textarea
            id='about-input'
            value = { this.props.about }
            onChange = { ::this.onAboutInputChange }/>
          <button
            onClick={ this.aboutConfirm.bind(this)}
            className="default-button">Изменить</button>
        </SkyLight>
      </div>
    )
  }
}
