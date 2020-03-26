import mongoose from "mongoose";

export class DatabaseConfig {
  #mongoURI;

  constructor(connectionString) {
    this.#mongoURI = connectionString;
  }

  async connectDb() {
    mongoose.connect(this.#mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    mongoose.connection.once("open", () =>
      console.log("Connected to the database")
    );
    mongoose.connection.on("error", err => console.error(err.message));

    return mongoose.connection;
  }
}
