import app from './app';

// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';
// require('dotenv').config();


let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    server = app.listen(config.port, () => {
      console.log(`jotter store listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();


//for async
process.on('unhandledRejection', () => {
  console.log(`UnhandledPromiseRejection is detected, shutting down..`);
  if(server) {
    server.close(() => {
      process.exit(1);
    })
  }
  process.exit(1);
})

//for sync
process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected, shutting down..`)

  process.exit(1);
})

// console.log(x)