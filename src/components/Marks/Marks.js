import React from "react";
import "./Marks.css";
import MarksItems from "./MarksItems/MarksItems";

const Marks = (props) => {
  const upperMarks = [
    {
      left: "Ones",
      right: "1 point per 1",
      data: "one",
      used: props.upperMarks.one.used,
    },
    {
      left: "Twos",
      right: "2 point per 2",
      data: "two",
      used: props.upperMarks.two.used,
    },
    {
      left: "Threes",
      right: "3 point per 3",
      data: "three",
      used: props.upperMarks.three.used,
    },
    {
      left: "Fours",
      right: "4 point per 4",
      data: "four",
      used: props.upperMarks.four.used,
    },
    {
      left: "Fives",
      right: "5 point per 5",
      data: "five",
      used: props.upperMarks.five.used,
    },
    {
      left: "Sixes",
      right: "6 point per 6",
      data: "six",
      used: props.upperMarks.six.used,
    },
  ];

  const assignMarkHandler = (kind) => {
    props.assignMark(kind);
  };

  const lowerMarks = [
    {
      left: "Three Of Kind",
      right: "sum all dice if 3 are the same",
      data: "tok",
      used: props.lowerMarks.tok.used,
    },
    {
      left: "Four Of Kind",
      right: "sum all dice if 4 are the same",
      data: "fok",
      used: props.lowerMarks.fok.used,
    },
    { left: "Full House", right: "25 points for a full house ", data: "fh" },
    {
      left: "Small Straight",
      right: "30 points for a small straight",
      data: "ss",
      used: props.lowerMarks.ss.used,
    },
    {
      left: "Large Straight",
      right: "40 points for a large straight",
      data: "ls",
      used: props.lowerMarks.ls.used,
    },

    {
      left: "Chance",
      right: "Sum of all dice",
      data: "c",
      used: props.lowerMarks.c.used,
    },
    {
      left: "Yahtzee",
      right: "50 points for yahtzee",
      data: "ytz",
      used: props.lowerMarks.ytz.used,
    },
  ];

  const lowerMarkAssignHandler = (kind) => {
    props.lowerAssignMark(kind);
  };

  return (
    <div className="marks-container">
      <div className="upper">
        <h4 className="heading">Upper</h4>
        <MarksItems
          assignMark={(kind) => {
            assignMarkHandler(kind);
          }}
          marks={upperMarks}
        />
      </div>
      <div className="upper">
        <h4 className="heading">Lower</h4>
        <MarksItems
          assignMark={(kind) => lowerMarkAssignHandler(kind)}
          marks={lowerMarks}
        />
      </div>
      <p className="total-score">Total Score {props.state.totalScore}</p>
    </div>
  );
};

export default Marks;
