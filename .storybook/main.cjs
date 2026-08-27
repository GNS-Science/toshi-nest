module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  "typescript": { "reactDocgen": "react-docgen-typescript" },

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  }
}