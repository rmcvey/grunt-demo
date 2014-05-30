# Required Dependencies
If you don't already have node, npm, sass and compass installed, please do so before you get started:

### Node & NPM
```
brew install node
```

### SASS
```
gem update --system
gem install sass
```

### Compass
```
gem update --system
get install compass
```

## Optional Dependency
If you don't have LiveReload installed, it can make things a little nicer for you by automatically reloading the page once certain grunt tasks have completed. You can get that here:

[LiveReload Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

# Getting Started
Once you have the repo checked out and have cd'd into it, run `npm install`, this will install all dev dependencies for the project. 

After the dependencies are installed, run `npm start` to fire up the server on port 8888 (**protip**: if that port is in use on your machine, pass an open port as the third param `npm start 8889`). Open up [http://localhost:8888](http://localhost:8888) in your favorite browser (Chrome)

# I'm Learnding
Read through `Gruntfile.js`, it is documented and has links to the full documentation for each module I'm using. Once you have a pretty good idea of what does what, fire up the watch task:

```
grunt monitor
```

Now that you have the watch task running, head over to `public/js/main.js` and add some code, for example:

```javascript
$('#container').prepend('<h1>Grunt is the shit</h1>');
```
