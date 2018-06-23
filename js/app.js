const Callbacks = {
  posts: [
    {
      title: 'Post One',
      body: 'This is post one',
    },
    {
      title: 'Post Two',
      body: 'This is post two',
    },
  ],

  init() {
    this._createPost({ title: 'Post Three', body: 'This is post three' }, Callbacks._getPosts);
  },

  _createPost(post, callback) {
    setTimeout(() => {
      Callbacks.posts.push(post);
      callback();
    }, 2000);
  },

  _getPosts() {
    setTimeout(() => {
      let output = '';
      Callbacks.posts.forEach(post => {
        output += `<li>${post.title}</li>`;
      });
      document.getElementById('main').innerHTML += output;
    }, 1000);
  },
};

const Promises = {
  posts: [
    {
      title: 'Post One',
      body: 'This is post one',
    },
    {
      title: 'Post Two',
      body: 'This is post two',
    },
  ],

  init() {
    Promises
      ._createPost({ title: 'Post Three', body: 'This is post three' })
      .then(Promises._getPosts)
      .catch(err => console.error(err));
  },

  _createPost(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Promises.posts.push(post);

        const error = false;

        if (!error) {
          resolve();
        } else {
          reject('Error: Something went wrong');
        }
      }, 2000);
    });
  },

  _getPosts() {
    setTimeout(() => {
      let output = '';
      Promises.posts.forEach(post => {
        output += `<li>${post.title}</li>`;
      });
      document.getElementById('main').innerHTML += output;
    }, 1000);
  },
};

const PromisesAll = {
  init() {
    const promise1 = Promise.resolve('Hello World');
    const promise2 = 10;
    const promise3 = new Promise((resolve, reject) =>
      setTimeout(resolve, 2000, 'Goodbye')
    );
    const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res =>
      res.json()
    );

    Promise.all([promise1, promise2, promise3, promise4]).then(values => {
      console.log(values);
      document.getElementById('main').innerHTML += 'Mira la consola!';
    });
  },
};

const AsyncAwait = {
  posts: [
    {
      title: 'Post One',
      body: 'This is post one',
    },
    {
      title: 'Post Two',
      body: 'This is post two',
    },
  ],

  async init() {
    await AsyncAwait._createPost({ title: 'Post Three', body: 'This is post three' });

    AsyncAwait._getPosts();
  },

  _createPost(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        AsyncAwait.posts.push(post);

        const error = false;

        if (!error) {
          resolve();
        } else {
          reject('Error: Something went wrong');
        }
      }, 2000);
    });
  },

  _getPosts() {
    setTimeout(() => {
      let output = '';
      AsyncAwait.posts.forEach(post => {
        output += `<li>${post.title}</li>`;
      });
      document.getElementById('main').innerHTML += output;
    }, 1000);
  },
};

const AsyncAwaitFetch = {
  async init() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log(data);
    document.getElementById('main').innerHTML += 'Mira la consola!';
  },
};

document.getElementById('callbacks').onclick = function() {
  Callbacks.init();
};

document.getElementById('promises').onclick = function() {
  Promises.init();
};

document.getElementById('promises-all').onclick = function() {
  PromisesAll.init();
};

document.getElementById('async-await').onclick = function() {
  AsyncAwait.init();
};

document.getElementById('async-await-fetch').onclick = function() {
  AsyncAwaitFetch.init();
};
