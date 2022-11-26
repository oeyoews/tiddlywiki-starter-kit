#!/usr/bin/env zx

// enable quiet mode
$.verbose = false;

function dmeo() {
  console.log("dmeo");
}

const index = {
  dmeo: dmeo,
};

// const ne = Array.from(index);
const ne = Object.keys(index);
console.log(ne);
