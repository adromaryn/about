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
    }
    this.refs.simpleDialog.show();
  };

  onCropConfirmClick(e) {
    var setAvatar = this.props.setAvatar;
    var dialog = this.refs.simpleDialog;
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
      backgroundImage:  `url(${this.props.avatar ? this.props.avatar : avaUrl})`
    };

    var cropDialogStyles = {
      position: 'absolute',
      minHeight: '430px'
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
        <SkyLight
          hideOnOverlayClicked
          ref="simpleDialog"
          dialogStyles={cropDialogStyles}
          afterOpen={this._executeAfterModalOpen}>
          <div
            id = 'cropImage'
            className = 'croppie-container'/>
          <button
            onClick={ this.onCropConfirmClick.bind(this)}
            className="default-button">Обрезать</button>
        </SkyLight>
      </div>
    )
  }
}
