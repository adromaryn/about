"use strict";

import	React,	{	Component	}	from	'react'
import	{	Link	}	from	'react-router'

export	default	class	Question	extends	Component	{

  onQuestionSelectChange(e) {
    var question = e.target.value;
    this.props.setQuestion(question);
    if (question == "Свой вопрос") {
      this.props.setYourQuestionVisibility(true);
    } else {
      this.props.setYourQuestionVisibility(false);
    }
  };

  onYourQuestionInputChange(e) {
    this.props.setYourQuestion(e.target.value);
  }

  onAnswerInputChange(e) {
    this.props.setAnswer(e.target.value);
  }

  render()	{
    const yourQVisible = this.props.yourQVisible;
    return	(
      <div>
        <p>Шаг 3/6: введите вопрос и ответ на него, это может понадобиться для восстановления пароля</p>
        <select onChange={ ::this.onQuestionSelectChange }>
          <option
            value="Выберите вопрос"
            disabled>Выберите вопрос</option>
          <option
            value="Кличка первого питомца">
            Кличка первого питомца
          </option>
          <option
            value="Любимое блюдо">
            Любимое блюдо
          </option>
          <option
            value="Имя первой учительницы">
            Имя первой учительницы
          </option>
          <option
            value="Свой вопрос">
            Свой вопрос
          </option>
        </select>
        <input
          type="text"
          name="your_question"
          className = { this.props.yourQVisible ? '' : 'hidden'}
          value = { this.props.yourQuestion }
          onChange={ ::this.onYourQuestionInputChange }></input>
        <input
          type="text"
          name="answer"
          placeholder="Ответ"
          value={ this.props.answer }
          onChange={ ::this.onAnswerInputChange }></input>
        <nav>
          <Link to='/password' className='left'>Назад</Link>
          <Link to='/name' className='right'>Вперёд</Link>
        </nav>
      </div>
    )
  }
}
