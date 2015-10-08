# Setup

## Use the right Node version

*Yes, this is a huge pain. Sorry, some of our dependencies are broken in Node 4.x.*

Check what version of Node you're running.

```sh
node --version
```

If you don't have Node installed or aren't running Node.js v0.12, start by installing nvm:

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.28.0/install.sh | bash
```

Restart your shell, then install Babel and Node v0.12:

```sh
nvm install 0.12
nvm use 0.12
npm install -g babel
```

## Install dependencies

Inside the `bean-docs` folder, run this to install the project dependencies:

```sh
npm install
```

# Usage

```sh
./do                 # list tasks
./do build           # build the site into /build
./do serve           # serve the site at localhost:8080 with live reloading
npm run gulp deploy  # deploy to GitHub Pages
```
