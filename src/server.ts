import { config } from 'dotenv';
import app from './app';

config();

const App = new app().app;
const start = () => {
  App.listen(process.env.PORT || 3011, () => {
    console.log(`Server up: http://localhost:${process.env.PORT || 3011}`);
  });
};

start();
process.on('exit', (reason) => {
  console.log(`connection exit`, reason);
  //closeConnection();
});
// process.on('SIGINT', (reason) => {
//   console.log(`connection SIGINT`, reason);
//   //closeConnection();
// });
process.on('SIGUSR1', (reason) => {
  console.log(`connection SIGUSR1`, reason);
  //closeConnection();
});

process.on('SIGUSR2', (reason) => {
  console.log(`connection SIGUSR2`, reason);
  //closeConnection();
});
process.on('uncaughtException', (reason) => {
  console.log(`connection uncaughtException`, reason);
  //closeConnection();
});
process.on('unhandledRejection', (reason) => {
  console.log('Reason: ' + JSON.stringify(reason));
});

// npm run dev: to tun the project


// npm run dev: to tun the project
