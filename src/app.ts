import { environments } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // TODO: await base de datos
  await MongoDatabase.connect({
    dbName: environments.MONGO_DB_NAME,
    mongoUrl: environments.MONGO_URL,
  });

  // TODO: inicio de nuestro server
  new Server({ port: environments.PORT, routes: AppRoutes.routes }).start();
}
