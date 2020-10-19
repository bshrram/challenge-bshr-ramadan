# Frontend Challenge

The goal of this test is to demonstrate technical proficiency in developing user interfaces with React in a simulated real-world scenario.

We are interested in your ability to work with an existing codebase, technical knowledge of React and browser technologies, your ability to interpret specification requirements, and ability to implement a reasonable solution in a reasonable time frame. However, there's a lot of leeway for doing things your own way: please use the tools, techniques, and conventions you're most comfortable with.

#### The scenario

This repository contains a skeleton implementation of a React-based DOM rendering engine. There exists a DOM tree represented as JSON, which is rendered recursively via React. Each DOM node is represented like so:

```javascript
{
  id: '1',
  tagName: 'a',
  className: 'some classNames go here', // results in the node having CSS selector .some.classNames.go.here
  style: {
    fontSize: 12,
    color: 'red'
  },
  // `children` is of two things:
  children: [ /* child dom nodes go here */ ]
  // children: 'some inline text', // represents raw innerHTML -- it could be the empty string
}
```

The sample data already exists and is loaded from [`data/dom.json`](data/dom.json). It is rendered via a React component called `JsonDOM`, found in [`src/JsonDom.js`](src/JsonDom.js).

#### The goal

Your job is to take the existing implementation and extend it with mouse tracking support.

In the top-right corner of the browser window there is a blank yellow box, (`src/OutputBox.jsx`). We need that box to display the current position of the user's mouse, as well as some additional metadata about what they are hovering over. This box must update dynamically as the user moves their mouse.

The full list of things we want to display in this box:

- The mouse `x` and `y` coordinates, _in pixels, relative to the bottom-left corner of the element currently being hovered_
- The _exact_ value of the `z-index` (as the browser sees it) of the deepest element that is currently being hovered
- The "breadcrumb" trail of the DOM structure that is currently being hovered, in a format like so:

`".root .hero h1.heading.big"`
`".root .hero h3"`
`".root .hero .wrapper a.x"`
`".root .hero span.lorem-ipsum.message"`

The above outputs are real examples that you should see when working with the sample `dom.json`. _Note that as a special exception, we do not output the `div` tag name, and we skip outputting `div` nodes entirely if they have no `className` (there are such invisible node paths in the above examples)._

Here is an example screenshot of what the final result might look like:

<img src="https://i.imgur.com/TS8AjqV.png" />

#### Restrictions

- You can `import` (or `<script>` in) any additional libraries you like, and you can code in any style or framework you deem appropriate.

- You may do whatever research you like, and use open source code as long as you're not violating copyright. Additionally, if you use someone else's code you are expected to be able to explain and maintain it exactly as if you wrote it.

- You may not modify the React children in `JsonDom.js`.

Finally, **you're not allowed to use `jQuery`**, or anything that smells like `jQuery` (so don't try to be sneaky and use `Zepto.js` instead).

#### Optional bonus

Add a test framework and implement some reasonable tests for your code.

#### How to set up

This example repository should run with the latest version of `node` (`10.15.3`). Running it should be as simple as:

```
npm install
npm start
```

To load the app in your browser, point your browser to `127.0.0.1:4500`. React hot-reloading is enabled by default but you are not required to use it (you can refresh the page after every change if you like).

#### What we're looking for

The main thing we are looking for is a reasonable, working solution to the problem given the above constraints, and your ability to justify implementation choices or assumptions you make. Clarity of coding style and reasonable documentation (comments) are also considered.

#### How to submit solution

1. Create a branch off of `master` in this repository
2. Commit new code to this branch, and push the branch to origin
3. Create a Pull Request on GitHub to merge your branch to `master`

- For the title, use: "Add mouse tracking support"
- In the pull request description, include a short GIF of your solution in action (you can use a screen capture tool like [LICEcap](http://www.cockos.com/licecap/) to generate the GIF).
- Feel free to add additional context about your implementation in the description (optional).

4. Leave the Pull Request open to facilitate code review

#### Commit-time formatting

This repo uses [`husky`](https://github.com/typicode/husky), [`lint-staged`](https://github.com/okonet/lint-staged) and [Prettier](https://prettier.io/) to automatically format your commits with [Prettier](https://prettier.io/). This helps reviewers by creating a consistent diff for them to review. If you feel confident that you _don't_ want Prettier run on your commits, use the `--no-verify` flag on commit.
