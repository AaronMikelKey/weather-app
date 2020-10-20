I built this app using the [OpenWeatherAPI](https://openweathermap.org)

Their API has a free version that is limited but works great for personal projects.

If you try to clone this or want to make your own, you will need to add a file called config.js and in that file export an object with your API key in it.

If you're using a bundler this should be fine but if you are just adding the scripts to an html file you will need to add `type="module"` to your scripts.js file.

Add the config.js file to your .gitignore file so it's not uploaded to github to keep your API key secure.