import { startServer } from './server';
import { connect } from "./config/type-orm";

async function main()  {

    connect();
    const port: number = 4000;
    const app = await startServer();
    app.listen(port);
    console.log("App running in port", port);
}

main();