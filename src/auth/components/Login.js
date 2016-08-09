import	React,	{	Component	}	from	'react'
import	{	Link	}	from	'react-router'

export	default	class	Login	extends	Component	{
  onLoginInputChange(e) {
    this.props.setLogin(e.target.value)
  }
  onPasswordInputChange(e) {
    this.props.setPassword(e.target.value)
  }
  render()	{
    return	(
      <div>
        <input
          type="text"
          name="login"
          placeholder="Никнейм"
          value={ this.props.login }
          onChange = { ::this.onLoginInputChange}
          ></input>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={ this.props.password }
          onChange = { ::this.onPasswordInputChange}></input>
        <nav>
          <a>Войти</a>
        </nav>
      </div>
    )
  }
}
