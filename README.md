# Advance Mobility - SDE Assignment

## Getting started locally

To run the application locally follow the below steps:

1. Make sure you have the following installed in your system:
   1. `Node JS`
   2. `Docker` (Optional, or `Podman`)
2. Clone the repository using the following:
   ```bash
   > git clone <REPO_LINK>
   ```
3. Change the directory to the `/server` and create a `.env` file with the following variables:
   ```.env
    MYSQL_ROOT_PASSWORD=...
    MYSQL_DATABASE=...
    MYSQL_HOST=127.0.0.1
    MYSQL_PORT=...
    MYSQL_USERNAME=...
    MYSQL_PASSWORD=...
    MYSQL_SYNCHRONIZE=...
   ```
4. Run the `MySQL` server using `docker-compose`. Run the following command:

   ```bash
   > docker-compose up
   ```

   The `MySQL` server is now up and running on ports `3306`.

5. Now start the `NestJS` server, using the following commands:

   ```bash
   > npm install // or you can use yarn, pnpm, etc..
   > nest start
   ```

   This would run the `NestJS` server on port `8000`.

6. Now to run the frontend `NextJS` app, first change directory to `/client` and run the following commands:

   ```bash
   > npm install
   > npm run dev
   ```

   Also create a `.env` file in the `client` directory with the following variables:

   ```
   NEXT_PUBLIC_SERVER_URL= ... # Enter the server url for examle, "http://localhost:8000".
   ```

7. Now visit the frontend by visiting `http://localhost:3000` on your browser.

## Database Models and Relationship

The `MySQL` server have the following tables:

1. Drivers (Stores the driver infromst)
2. Vehicles (Stores the vehice information)
3. Transfer (Stores the transfer records and history)

## Current Limitations

The application works as intended, but there is a need to work on refining the frontend of the application. The server includes all the `CRUD` operations required for all the entites. The `Git` commit history needs to maintained in much more concise manner.

## Future Disscussion

To address the issue of future expansion where the system would allow transfer of vehicle not only amongst the drivers but also amongst other entities. This can be achieved by extend the `Drivers` table to include other entities as well. Or we can create another table, that could store all the entites that are eligible for vehcile transfers.

## Tech Stack

1. Client Stack
   1. `NextJS`
   2. `Tanstack Table`
   3. `TailwindCSS`
   4. `ShadCN`
2. Server Stack
   1. `NestJS`
   2. `TypeORM`
   3. `Multer`
3. Other tools
   1. `VS Code`
   2. `Docker`

## Working of the application

1. Driver's Screen
   ![Driver's Screen](./docs/Drivers%20Screen.png)

1. Vehicles Screen
   ![Vehicles's Screen](./docs/Vehicle%20Screen.png)

1. Transfers Screen
   ![Transfers's Screen](./docs/Transfer%20Screen.png)
