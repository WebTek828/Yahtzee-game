import React, { Component } from "react";
import Dice from "../Dice/Dice";
import "./Game.css";
import Marks from "../Marks/Marks";
class Game extends Component {
  changeNum = {
    num1: "one",
    num2: "two",
    num3: "three",
    num4: "four",
    num5: "five",
    num6: "six",
  };

  turnNum = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
  };

  state = {
    dices: {
      dice1: { num: 1, freeze: false },
      dice2: { num: 2, freeze: false },
      dice3: { num: 3, freeze: false },
      dice4: { num: 4, freeze: false },
      dice5: { num: 5, freeze: false },
    },
    upper: {
      one: { used: false, count: "" },
      two: { used: false, count: "" },
      three: { used: false, count: "" },
      four: { used: false, count: "" },
      five: { used: false, count: "" },
      six: { used: false, count: "" },
    },
    lower: {
      tok: { val: "", used: false, point: "" },
      fok: { val: "", used: false, point: "" },
      fh: { val: "", used: false, point: 25 },
      ss: { val: "", used: false, point: 30 },
      ls: { val: "", used: false, point: 40 },
      c: { val: true, used: false, point: "" },
      ytz: { val: "", used: false, point: 50 },
    },
    rollsLeft: 3,
    totalScore: 0,
    rolling: false,
    disableDice: false,
    assigned: false,
  };

  rollDiceHandler = () => {
    const deleteCountInUpper = { ...this.state.upper };
    for (let key in deleteCountInUpper) {
      deleteCountInUpper[key].count = "";
    }
    const rollsLeft = this.state.rollsLeft - 1;

    this.setState({
      upper: deleteCountInUpper,
      rolling: true,
      assigned: false,
    });

    setTimeout(() => {
      const rns = [];
      const oldDices = { ...this.state.dices };

      for (let key in this.state.dices) {
        if (!this.state.dices[key].freeze) {
          const rn = Math.floor(Math.random() * 6 + 1);
          rns.push({ dice: key, val: rn });
        }
      }
      rns.forEach((ds) => {
        oldDices[ds.dice].num = ds.val;
      });

      this.setState({ dices: oldDices, rolling: false, rollsLeft });

      const dicesVal = {};
      for (let key in this.state.dices) {
        const numVal = this.changeNum["num" + this.state.dices[key].num];
        if (dicesVal[numVal]) {
          dicesVal[numVal] = dicesVal[numVal] + 1;
        } else {
          dicesVal[numVal] = 1;
        }
      }

      const dicesValArr = Object.entries(dicesVal);

      const oldLower = { ...this.state.lower };

      //for chance
      let allDicesValSum = 0;
      for (let key in dicesVal) {
        allDicesValSum += this.turnNum[key] * dicesVal[key];
      }
      const c = { ...this.state.lower.c };
      c.point = allDicesValSum;
      oldLower.c = c;

      //check tok fok

      const smallStraight = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
      ];

      const largeStraight = [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
      ];

      const straights = [];

      for (let key in dicesVal) {
        const numVal = this.turnNum[key];
        if (dicesVal[key] === 3) {
          oldLower.tok.val = this.turnNum[key];
          oldLower.tok.point = this.turnNum[key] * 3;
        } else if (dicesVal[key] === 4) {
          oldLower.fok.val = this.turnNum[key];
          oldLower.fok.point = this.turnNum[key] * 4;
        }
        straights.push(this.turnNum[key]);
      }
      straights.sort((a, b) => a - b);

      const largeStraightResult = largeStraight.some((nums) => {
        nums.sort((a, b) => a - b);
        return JSON.stringify(straights) === JSON.stringify(nums);
      });

      const smallStraightResult = smallStraight.some((s) => {
        s.sort((a, b) => a - b);
        return JSON.stringify(s) === JSON.stringify(straights);
      });
      if (smallStraightResult) {
        oldLower.ss.val = true;
      } else if (largeStraightResult) {
        oldLower.ls.val = true;
      }

      if (
        dicesValArr.length === 2 &&
        dicesValArr[1][1] > 1 &&
        dicesValArr[0][1] > 1
      ) {
        oldLower.fh.val = true;
      } else if (dicesValArr.length === 1) {
        oldLower.ytz.val = true;
      }

      const oldUpper = { ...this.state.upper };
      for (let key in dicesVal) {
        oldUpper[key].count = dicesVal[key];
      }
      this.setState({ upper: oldUpper, lower: oldLower });
      if (this.state.rollsLeft === 0) {
        this.setState({ disableDice: true });
      }
    }, 500);
  };

  assignMarkHandler = (kind) => {
    const upper = this.state.upper[kind];
    const valNum = this.turnNum[kind];
    if (upper.count && !upper.used && !this.state.assigned) {
      const oldScore = this.state.totalScore;
      const oldDices = { ...this.state.dices };
      for (let key in oldDices) {
        oldDices[key].freeze = false;
      }
      const updateUpper = { ...this.state.upper };
      updateUpper[kind].used = true;
      // this.setState({ upper: updateUpper });
      this.setState({
        totalScore: oldScore + valNum * upper.count,
        assigned: true,
        rollsLeft: 3,
        disableDice: false,
        dices: oldDices,
        upper: updateUpper,
      });
    }
  };

  lowerAssignMarkHandler = (kind) => {
    const lower = this.state.lower;
    if (lower[kind].val && !lower[kind].used && !this.state.assigned) {
      const oldDices = { ...this.state.dices };
      for (let key in oldDices) {
        oldDices[key].freeze = false;
      }
      const oldScore = this.state.totalScore;
      lower[kind].used = true;
      this.setState({
        totalScore: oldScore + lower[kind].point,
        rollsLeft: 3,
        disableDice: false,
        assigned: true,
        dices: oldDices,
      });
    }
  };

  freezeDiceHandler = (e) => {
    const diceKind = e.target.dataset.kind;
    const oldDices = { ...this.state.dices };
    oldDices[`dice${diceKind}`].freeze = !oldDices[`dice${diceKind}`].freeze;
    this.setState({ dices: oldDices });
    const freezedDices = [];
    for (let key in this.state.dices) {
      if (this.state.dices[key].freeze) {
        freezedDices.push(true);
      }
    }

    if (freezedDices.length === 5 || this.state.rollsLeft === 0) {
      this.setState({ disableDice: true });
    } else {
      this.setState({ disableDice: false });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="game">
        <div className="dices">
          <Dice
            rolling={this.state.rolling}
            data="1"
            freeze={this.state.dices.dice1.freeze}
            freezeDice={(e) => this.freezeDiceHandler(e)}
            diceNum={this.changeNum["num" + this.state.dices.dice1.num]}
          />
          <Dice
            rolling={this.state.rolling}
            freeze={this.state.dices.dice2.freeze}
            data="2"
            freezeDice={(e) => this.freezeDiceHandler(e)}
            diceNum={this.changeNum["num" + this.state.dices.dice2.num]}
          />
          <Dice
            rolling={this.state.rolling}
            freeze={this.state.dices.dice3.freeze}
            data="3"
            freezeDice={(e) => this.freezeDiceHandler(e)}
            diceNum={this.changeNum["num" + this.state.dices.dice3.num]}
          />
          <Dice
            rolling={this.state.rolling}
            freeze={this.state.dices.dice4.freeze}
            data="4"
            freezeDice={(e) => this.freezeDiceHandler(e)}
            diceNum={this.changeNum["num" + this.state.dices.dice4.num]}
          />
          <Dice
            rolling={this.state.rolling}
            freeze={this.state.dices.dice5.freeze}
            data="5"
            freezeDice={(e) => this.freezeDiceHandler(e)}
            diceNum={this.changeNum["num" + this.state.dices.dice5.num]}
          />

          <button
            disabled={this.state.disableDice}
            onClick={this.rollDiceHandler}
            className="dices__btn"
          >
            {this.state.rollsLeft} rolls left
          </button>
        </div>
        <Marks
          lowerAssignMark={(kind) => this.lowerAssignMarkHandler(kind)}
          assignMark={(kind) => this.assignMarkHandler(kind)}
          state={this.state}
          upperMarks={this.state.upper}
          lowerMarks={this.state.lower}
        />
      </div>
    );
  }
}

export default Game;
