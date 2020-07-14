import React from "react";

function Point(props) {
  //console.log(props);
  // we are going to loop thru the pointDesc array
  const descObj = props.pointDesc.find(
    // the first element that matches our criteria will be assigned to the variable descObj. when the point.pointTitle equals props.point it becomes the text we will put on the screen. so we are saying find a match inside of pointTitle which is inside of the array that was sent down, the array being props.pointDesc and that gets stored inside of descObj.
    (point) => point.pointTitle === props.point
  );
  console.log(descObj);
  return (
    <div>
      <div className="point-title">{props.point}</div>
      <div className="point-desc">{descObj.text}</div>
    </div>
  );
}

export default Point;
