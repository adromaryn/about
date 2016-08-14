"use strict";

import	React,	{	Component	}	from	'react'
import	{	Link	}	from	'react-router'

export	default	class	Nickname	extends	Component	{

  onNickInputChange(e) {
    this.props.setNick(e.target.value);
  };

  render()	{
    return	(
      <div>
        <p>Шаг 1/6: введите свой никнейм (только латинские буквы, цифры и дефис)</p>
        <input
          type="text"
          name="nick"
          value={ this.props.nick }
          onChange={ ::this.onNickInputChange }></input>
        <nav>
          <Link to='/password' className='right'>Вперёд</Link>
        </nav>
      </div>
    )
  }
}
