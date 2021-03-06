# Setup

## Use Node 4+

Check what version of Node you're running.

```sh
node --version
```

If it doesn't start with `v4` or greater (`v5`, etc.), you need to update Node. You're probably on a Mac and installed Node via Homebrew, so try:

```sh
brew update
brew upgrade node
```

## Install Dependencies

Inside the `bean-docs` folder, run this to install the project dependencies:

```sh
npm install
```

# Usage

```sh
npm run build   # build the site into /build
npm run serve   # serve the site at localhost:8080 with live reloading
npm run deploy  # deploy to GitHub Pages
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

### Max Width

To make an image take up less width horizontally and place margins around the left and right sides, add a max width argument:

```
{{{img_rel this 'blue_led.jpg' 'A description of this image' '50%'}}}
```

The image above will be 50% the width of the content column with 25% margins on the left and right sides.

## Videos

For videos, use the same syntax with `video_rel` instead:

```
{{{video_rel this 'move_bean.mp4' '60%' true}}}
```

'video_rel' takes an additional argument for enabling autoplay and looping.

Note: The max width argument doesn't work with videos yet.

# Verifying Style

We have a few checks for both code and content. Rum them as follows:

```bash
npm run lint-style  # Check Markdown files for common writing errors
npm run lint-code   # Check JavaScript files for style errors
```
