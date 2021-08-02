export default {
	"plugins": [
		require.resolve('babel-plugin-module-resolver'),
		["module-resolver", {
			"root": ["./src"],
			"alias": {
				"components": "./src/components"
			}
		}]
	]
}