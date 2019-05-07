# GitHub OAuth Tester

When getting started with GitHub OAuth apps it's always good to have a base on which to understand how the functionality works. This offers step by step pointers on getting this configured and testing with NodeJS / Express. Written in Typescript/

## Usage

> Don't forget to setup a free ngrok.io account [ngrok](https://ngrok.com/) and setup the token (see the account page)


1. Clone down a copy of this repository
2. From the root directory of the repository run `npm install`
3. Create a GitHub OAuth App

### Option 1, supplying OAuth app details via `.env`
4. Create a `.env` file in the root directory of this repository with the CLIENT_ID and CLIENT_SECRET from your OAuth app configured:

```
CLIENT_ID=1234567b
CLIENT_SECRET=b7654321
```

### Option 2, supplying OAuth app details via Command Line

4. When executing step 5, you can supply `--client_id=XXXX --client_secret=XXXX` if you have multiple apps or don't want to hard code this value.

5. run `npm run start` - this will compile the typescript and run lint checks before firing up the server (I'll make this a `bin` file later!)
6. Follow the steps provided

Example output:

```
A simple GitHub OAuth test app flow
1. Add https://18b785d3.ngrok.io/authorization as your Authorization callback URL
> Press any key to open your settings
2. Generated URI https://github.com/login/oauth/authorize?client_id=:client_id
> Press any key to test the authentication flow

===========================================================


Exchanging code for access token
Exchanged successfully
Access token created: :token
```

## Command Line Options

- `--client_id` The client id found in the OAuth app (used to tie the authentication to the app)
- `--client_secret` The client secret found in the OAuth app (used to generate the access token)
- `--scope` Allows you to provide the OAuth scopes you'd like (`--scope=user --scope=repo --scope=read:org`)
- `--port` This is the port to expose for ngrok (Defaults to 5000)

## TODO List

1. Make this a bin and add it to npm
2. Use octokit to pull down  metadata for the token:
  - The users handle  
  - The scopes the token is authorized with
  - The other tokens for that user for this app, grouped by scopes
  - The organizations the user is a member of

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
