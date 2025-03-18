const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("start", () => {
    console.log("Started");
})

myEmitter.emit("start"); // Started



myEmitter.on("numstart", (number) => {
    console.log(`Started ${number}`);
})

myEmitter.emit("numstart", 15); // Started 15



function fn(start, end) {
    console.log(`Started from ${start} to ${end}`);
}

myEmitter.on("startToEnd", fn);
myEmitter.emit("startToEnd", 1, 5); // Started from 1 to 5
console.log(myEmitter.listeners("startToEnd")); // [ [Function: fn] ]



myEmitter.on("listenEvent", function firstListener() {
    console.log("Hello firstListner");
})

myEmitter.emit("listenEvent"); // Hello firstListner
console.log(myEmitter.listeners("listenEvent")); // [ [Function: firstListener] ]


// Notes:
// emit is used to trigger an event.
// on is used to add a callback function that's going to be executed when the event is triggered.
// You can pass arguments to the event handler by passing them as additional arguments to emit():
