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

# Writing Content

## Images

Images go inside `src/_assets/images/FOLDER_NAME/FILE_NAME/IMAGE_NAME.EXT`, where `FOLDER_NAME` and `FILE_NAME` match the document referring to them.

Here's where you would put an image named `blue_led.jpg` to be accessed from inside the `features/accelerometer.md` guide:

```
src/_assets/images/features/accelerometer/blue_led.jpg
```

Inside `accelerometer.md`, add the following Handlebars helper call to add the image tag:

```
{{{img_rel this 'blue_led.jpg' 'A description of this image'}}}
```

When you use the above tag in your own documents, replace `blue_led.jpg` with your actual file name, and replace "A description of this image" with your own description of your image.

## Videos

For videos, use the same syntax with `video_rel` instead:

```
{{{video_rel this 'move_bean.mp4' 'A description of this video'}}}
```
