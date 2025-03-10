import express from 'express';
import cron from 'node-cron'

const app = express();

app.use(express.json());

// cron.schedule('* * * * *', () => {
//     console.log("Running a task every minute");
// })

// cron.schedule('*/2 * * * *', () => {
//     console.log("running a task every two minutes");
// })

// cron.schedule('1,2,4,5 * * * *', () => {
//     console.log('running every minute 1, 2, 4 and 5');
// });

// cron.schedule('* * * January,September Sunday', () => {
//     console.log('running on Sundays of January and September');
// });

// cron.schedule('* * * Jan,Sep Sun', () => {
//     console.log('running on Sundays of January and September');
// });

let task = cron.schedule('* * * * *', () => {
    console.log('will execute every minute until stopped');
}, {
    scheduled: false
})

// task.start();
// task.stop();


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *