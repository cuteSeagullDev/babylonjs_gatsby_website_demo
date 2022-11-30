
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

exports.onCreateWebpackConfig = ({
  rules,
  loaders,
  plugins,
  actions
}) => {
  actions.setWebPackConfig({
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|env|glb|gltf|stl)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          }
        },
      ]
    }
  })


}

