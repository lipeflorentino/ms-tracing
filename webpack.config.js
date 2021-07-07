const slsw = require("serverless-webpack")
const nodeExternals = require("webpack-node-externals")

module.exports = {
	entry: slsw.lib.entries,
	target: "node",
	// Gerar os sourcemaps para mensagens de erro
	devtool: "source-map",
	// Tendo em vista que o 'aws-sdk' é incompatível com o webpack,
	// nós excluímos todas as dependências
	externals: [nodeExternals()],
	mode: slsw.lib.webpack.isLocal ? "development" : "production",
	optimization: {
		// Não queremos minimizar nosso código por agora.
		minimize: false
	},
	performance: {
		// Desabilita warnings sobre o tamanho das entry points
		hints: false
	},
	// Executar o babel em todos arquivos .js e pular todos existentes na pasta node_modules
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				include: __dirname,
				exclude: /node_modules/
			}
		]
	}
}