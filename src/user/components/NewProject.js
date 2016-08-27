"use strict";

import	React,	{	Component	}	from	'react';
import	{	Link	}	from	'react-router';

export	default	class	Contacts	extends	Component	{

  addProject() {
    alert(this);
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
      </div>
    )
  }
}
