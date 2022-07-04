import React, { useState, useEffect } from "react";
import data from "./data.json";
import "./App.scss";

const VirtualizedList = () => {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setScrollTop(window.scrollY)
    };
    window.addEventListener("scroll", onScroll);
  }, []);
 

  const itemHeight = 250;
  const windowHeight = window.innerHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const numItems = data.length;
  const innerHeight = numItems * itemHeight;
  const endIndex = Math.min(
    numItems - 1, // don't render past the end of the list
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );
  const renderItemUI = (obj) => (
    <div
      key={obj.item.id}
      style={obj.style}
      className={
        obj.item.priority === "Low"
          ? "low ticket"
          : obj.item.priority === "Medium"
          ? "med ticket"
          : obj.item.priority === "High" && "high ticket"
      }
    >
      <label>
        <span
          className={
            obj.item.status === "New"
              ? "New status"
              : obj.item.status === "In Progress"
              ? "InProgress status"
              : obj.item.status === "Solved"
              ? "Solved status"
              : obj.item.status === "Closed" && "Closed status"
          }
        >
          {obj.item.status}
        </span>
        <div className="lbl">
          {obj.item.subject}
          <span className="priority">{obj.item.priority}</span>
        </div>
      </label>

      <p>{obj.item.description}</p>
    </div>
  );

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItemUI({
        index: i,
        style: {
          position: "absolute",
          top: `${i * itemHeight}px`,
        },
        item: data[i],
      })
    );
  }

  return (
    <>
      <div className="scroll">
        <div
          className="inner"
          style={{ position: "relative", height: `${innerHeight}px` }}
        >
          {items}
        </div>
      </div>
    </>
  );
};

export default VirtualizedList;
