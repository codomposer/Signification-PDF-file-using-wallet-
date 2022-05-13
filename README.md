# PDF Sign using wallet address and encode using private address

# Node.js Rest APIs with Express, Sequelize For Back end

# React for Front end

## Install dependencies

```zsh
npm install
```

## Usage

```bash
node server.js -U 'me' -p 'password'
```

### How to set up remote Postgres connection

#### Summarized Steps

Expect to do the required tasks

![image](https://user-images.githubusercontent.com/5965718/160250849-43945b57-abfe-47db-a81a-5161efcfef2a.png)

1. Modify the `pg_hba.conf` file and add an entry for the following
2. Start msc.services as an admin in Win10, to do that you'll have to hit Windows button then type `services.msc` then right click start as administrator

Documentation on auth methods

> trust  
> Allow the connection unconditionally. This method allows anyone that can connect to the PostgreSQL database server to login as any PostgreSQL user they wish, without the need for a password or any other authentication. See Section 20.4 for details.

> cert
> This authentication method uses SSL client certificates to perform authentication. It is therefore only available for SSL connections. When using this authentication method, the server will require that the client provide a valid, trusted certificate. No password prompt will be sent to the client. The cn (Common Name) attribute of the certificate will be compared to the requested database user name, and if they match the login will be allowed. User name mapping can be used to allow cn to be different from the database user name.

> md5  
> Perform SCRAM-SHA-256 or MD5 authentication to verify the user's password. See Section 20.5 for details.

> password  
> Require the client to supply an unencrypted password for authentication. Since the password is sent in clear text over the network, this should not be used on untrusted networks. See Section 20.5 for details.

#### Optionally

You may have to

1. Check the `postgresql.conf` file to

#### Content

```bash
psql -h <REMOTE HOST> -p <REMOTE PORT> -U <DB_USER> <DB_NAME>
```

## Troubleshooting

#### If you get the error message

```zsh
psql: error: connection to server at "192.168.0.XXX", port 5432 failed: FATAL:  no pg_hba.conf entry for host "192.168.0.XXX", user "me", database "api", SSL off
```

You likely enabled the setting in windows firewall but misconfigured it.

#### Where is pg_hba.conf stored

By default on Win10 it is located at

```bash
C:\AppData\PostgreSQL\13\pg_hba.conf
```

AppData is synonymous with the folder one chooses when selecting a data directory. This typically will be different than the source folder directory

- Create a .env file in the root folder and set these variables:
  ```
  CLIENT_ID=Your Client ID from Github
  CLIENT_SECRET=Your Client Secret from Github
  REDIRECT_URI=http://localhost:3000/v0/oauth_callback
  PROXY_URL=http://localhost:8080/authenticate
  SERVER_PORT=8080
  ```

```
yarn dev
```
