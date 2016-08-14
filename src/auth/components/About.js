"use strict";

import	React,	{	Component	}	from	'react'
import	{	Link	}	from	'react-router'

export	default	class	About	extends	Component	{

  onResumeInputChange(e) {
    this.props.setResume(e.target.value);
  };

  onAboutInputChange(e) {
    this.props.setAbout(e.target.value);
  };

  render()	{
    return	(
      <div>
        <p>Шаг 5/6: расскажите немного о себе</p>
        <p>Здесь пару слов о том, чем вы занимаетесь, например, "Frontend Developer"</p>
        <input
          type="text"
          name="resume"
          value={ this.props.resume }
          onChange={ ::this.onResumeInputChange }></input>
        <p>Здесь кратко о себе и своих навыках:</p>
        <textarea
          name="about"
          value={ this.props.about }
          onChange={ ::this.onAboutInputChange }></textarea>
        <nav>
          <Link to='/name' className="left">Назад</Link>
          <Link to='/avatar' className="right">Вперёд</Link>
        </nav>
      </div>
    )
  }
}
