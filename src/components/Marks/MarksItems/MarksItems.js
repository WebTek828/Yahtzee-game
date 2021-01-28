import React from "react";

const MarksItems = (props) => {
  let clsName;
  const marks = props.marks.map((u) => {
    const clickedHandler = (e) => {
      const parent = e.target.closest(".marks");
      props.assignMark(parent.dataset.kind);
    };
    return (
      <div
        onClick={clickedHandler}
        data-kind={u.data}
        className={u.used ? "marks used" : "marks"}
      >
        <span className="left">{u.left}</span>
        <span className="right">{u.right}</span>
      </div>
    );
  });
  return marks;
};
export default MarksItems;
