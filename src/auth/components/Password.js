"use strict";

import	React,	{	Component	}	from	'react'
import	{	Link	}	from	'react-router'

export	default	class	Password	extends	Component	{

  onPasswordInputChange(e) {
    this.props.setPassword(e.target.value);
  };

  onConfirmationInputChange(e) {
    this.props.setConfirmation(e.target.value);
  };

  render()	{
    return	(
      <div>
        <p>Шаг 2/6: введите свой пароль (не менее 6 символов)</p>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={ this.props.password }
          onChange = { ::this.onPasswordInputChange }></input>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Повторите"
          value={ this.props.confirmation }
          onChange={ ::this.onConfirmationInputChange }></input>
        <nav>
          <Link to='/nick' className='left'>Назад</Link>
          <Link to='/question' className='right'>Вперёд</Link>
        </nav>
      </div>
    )
  }
}
