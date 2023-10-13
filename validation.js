export {
  isVerticalDescendent,
  isVerticalAscendent,
  isHorizontalLeftToRight,
  isHorizontalRightToLeft,
  isDiagonalDescendent,
  isDiagonalAscendent,
};
function isVerticalDescendent(start, end) {
  let startLetter = start.split("")[0];
  let startNumber = parseInt(start.split("")[1]);
  let endLetter = end.split("")[0];
  let endNumber = parseInt(end.split("")[1]);
  if (startNumber > endNumber && startLetter === endLetter) {
    return true;
  } else {
    return false;
  }
}

function isVerticalAscendent(start, end) {
  let startLetter = start.split("")[0];
  let startNumber = parseInt(start.split("")[1]);
  let endLetter = end.split("")[0];
  let endNumber = parseInt(end.split("")[1]);
  if (startNumber < endNumber && startLetter === endLetter) {
    return true;
  } else {
    return false;
  }
}
function isHorizontalLeftToRight(start, end) {
  let startLetter = start.split("")[0].charCodeAt(0);
  let startNumber = parseInt(start.split("")[1]);
  let endLetter = end.split("")[0].charCodeAt(0);
  let endNumber = parseInt(end.split("")[1]);

  if (startNumber === endNumber && startLetter < endLetter) {
    return true;
  } else {
    return false;
  }
}
function isHorizontalRightToLeft(start, end) {
  let startLetter = start.split("")[0].charCodeAt(0);
  let startNumber = parseInt(start.split("")[1]);
  let endLetter = end.split("")[0].charCodeAt(0);
  let endNumber = parseInt(end.split("")[1]);
  if (startNumber === endNumber && startLetter > endLetter) {
    return true;
  } else {
    return false;
  }
}
function isDiagonalDescendent(start, end) {
  let startLetter = start.split("")[0].charCodeAt(0);
  let startNumber = parseInt(start.split("")[1]);
  let endLetter = end.split("")[0].charCodeAt(0);
  let endNumber = parseInt(end.split("")[1]);

  let letterDifference = Math.abs(startLetter - endLetter);
  let numDifference = Math.abs(startNumber - endNumber);

  if (letterDifference === numDifference) {
    /*es diagonal*/
    const directionY = startNumber < endNumber ? 1 : -1;
    if (directionY === -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function isDiagonalAscendent(start, end) {
  let startLetter = start.split("")[0].charCodeAt(0);
  let startNumber = parseInt(start.split("")[1]);
  let endLetter = end.split("")[0].charCodeAt(0);
  let endNumber = parseInt(end.split("")[1]);

  let letterDifference = Math.abs(startLetter - endLetter);
  let numDifference = Math.abs(startNumber - endNumber);

  if (letterDifference === numDifference) {
    /*es diagonal*/
    const directionY = startNumber < endNumber ? 1 : -1;
    if (directionY === 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
