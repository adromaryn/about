"use strict";

import	React,	{	Component	}	from	'react'
import SkyLight from 'react-skylight';
require('croppie');
var avaUrl = require('../../default_ava.jpg');
var cropImage = avaUrl;
var croppieContainer;
import cookie from 'react-cookie';

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
            return result.json();
          })
          .then(result => {
            if (result.status == 'Avatar updated successfully!') {
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


  resetAvatar() {
    this.props.setAvatar(undefined);
  }

  onNameClick(e) {
    this.refs.nameDialog.show();
  };

  onNameInputChange(e) {
    this.props.setName(e.target.value);
  }

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
        return result.json();
      })
      .then(result => {
        if (result.status == 'Name updated successfully!') {
          this.props.setCachedName(this.props.name);
        } else {
          this.props.setName(this.props.nameCached);
        }
        this.refs.nameDialog.hide();
      });
  }

  render()	{

    var avaStyle = {
      backgroundImage:  `url(${this.props.avatar ? this.props.avatar : avaUrl})`
    };

    var cropDialogStyles = {
      position: 'absolute',
      minHeight: '430px'
    };
    var nameDialogStyles = {
      position: 'absolute',
      height: '150px'
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
        <h1
          id="name"
          onClick= { window.userStatus === 'owner' ? (::this.onNameClick) : ()=>{}}>
          { this.props.nameCached === '' ? this.props.nick : this.props.nameCached}
        </h1>
        <h2 id="resume"> {this.props.resume} </h2>
        <h3 className={ this.props.about === '' ? 'hidden' : '' }>Обо мне</h3>
        <p> { this.props.about } </p>
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
          dialogStyles={nameDialogStyles}>
          Изменение имени ( если имя пустое, на странице будет показан никнейм)
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
      </div>
    )
  }
}
