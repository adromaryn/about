"use strict";

import	React,	{	Component	}	from	'react'
import	{	Link	}	from	'react-router'

export	default	class	Name	extends	Component	{
  onNameInputChange(e) {
    this.props.setName(e.target.value);
  };
  render()	{
    return	(
      <div>
        <p>Шаг 4/6: введите Ваше имя, которое будет видно на сайте (если пропустите, вместо имени будет виден никнейм)</p>
        <input
          type="text"
          name="name"
          value={ this.props.name }
          onChange={ ::this.onNameInputChange }></input>
        <nav>
          <Link to='/question' className="left">Назад</Link>
          <Link to='/about' className="right">Вперёд</Link>
        </nav>
      </div>
    )
  }
}
