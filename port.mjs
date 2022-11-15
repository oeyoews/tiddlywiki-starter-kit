import { getPort, setBasePort, setHighestPort } from "portfinder";

setBasePort(8080); // default: 8000
setHighestPort(8888); // default: 65535

getPort(function (err, port) {
  // `port` is guaranteed to be a free port
  // in this scope.
  console.log(port);
});
