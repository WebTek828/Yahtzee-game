import React from "react";
import "./Dice.css";
const Dice = (props) => {
  let dice;
  let diceCls;

  props.freeze
    ? (diceCls = `dice fas fa-dice-${props.diceNum} freeze`)
    : (diceCls = `dice fas fa-dice-${props.diceNum}`);

  if (props.rolling && !props.freeze) {
    diceCls = `dice fas fa-dice-${props.diceNum} rolling`;
  } else if (props.freeze) {
    diceCls = `dice fas fa-dice-${props.diceNum} freeze`;
  }

  dice = (
    <i
      onClick={props.freezeDice}
      className={diceCls}
      data-kind={props.data}
    ></i>
  );
  return dice;
};

export default Dice;
