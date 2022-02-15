## Set Up

1. In the terminal, navigate to the directory of the React web app you are creating

2. Then type `npm install wt-frontend`

3. Make sure you have the peer dependencies installed. If you don’t have these packages installed already, do the following: `npm install sass` and/or `npm install react-router-dom`

4. Change your .css files to .scss and put the following code at the top of the .scss file:

  ```css
  @use 'node_modules/wt-frontend/build/global/wolfie';

  @use 'node_modules/wt-frontend/build/global/components';
  ```

<br/>

<a name="ex-note"></a>
Note: If you want to look at our example pages, copy in our entire directory. Open the example pages by navigating to our directory, running `npm install` in the terminal, then `npm start`.

---

Documentation: https://tinyurl.com/wt-frontend-docs

Email: wolfietools.frontend@gmail.com











