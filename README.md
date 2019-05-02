# GitHub OAuth Tester

When getting started with GitHub OAuth apps it's always good to have a base on which to understand how the functionality works. This offers step by step pointers on getting this configured and testing with NodeJS / Express

## Usage

> Don't forget to setup a free ngrok.io account [ngrok](https://ngrok.com/) and setup the token (see the account page)


1. Clone down a copy of this repository
2. From the root directory of the repository run `npm install`
3. Create a GitHub OAuth App
4. Create a `.env` file in the root directory of this repository with the CLIENT_ID and CLIENT_SECRET from your OAuth app configured:

```
CLIENT_ID=1234567b
CLIENT_SECRET=b7654321
```

5. run `node index.js` (I'll make this a `bin` file later!)
6. Follow the steps provided

## TODO List

1. Make this a bin and add it to npm
2. Add more automation and clean up the code
3. Just add more stuff tbh. 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
