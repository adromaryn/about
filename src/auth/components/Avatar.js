"use strict";

import	React,	{	Component	}	from	'react';
import	{	Link	}	from	'react-router';
import SkyLight from 'react-skylight';
require('croppie');
require('../../../node_modules/croppie/croppie.css');
var avaUrl = require('../../default_ava.jpg');
var cropImage = avaUrl;
var croppieContainer;

export	default	class	Avatar	extends	Component	{

  onAvaClick(e) {
    var avaClick = new Event('click');
    document.getElementById('avatar-input').dispatchEvent(avaClick);
  };

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
        <div id="avatar">
          <img
            src ={ src }
            onClick = { ::this.onAvaClick }/>
        </div>
        <div
          className={ this.props.avatar ? 'minLink' : 'hidden' }
          onClick= {::this.resetAvatar } >
          <a>Очистить аватар</a></div>
        <input
          type="file"
          name="avatar"
          size="chars"
          id="avatar-input"
          onChange={ ::this.onAvaChange }></input>
        <nav>
          <Link to='/about' className="left" >Назад</Link>
          <a className="right">Вперёд!</a>
        </nav>
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
