#!/usr/bin/env zx

// enable quiet mode
$.verbose = true;

function timestamp() {
  const time = new Date();
  const y = time.getFullYear();
  const M = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  const normalDate = `${y}${M}${d}${h}${m}${s}`;
  return normalDate;
}

function titleCase(str) {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

const base = {
  titleCase,
  timestamp,
};

export default base;
