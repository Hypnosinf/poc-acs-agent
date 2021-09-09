export default {
	setToken:({commit}, value) => {
		commit('SET_TOKEN', value)
	},
	setIdentityId:({commit}, value) => {
		commit('SET_IDENTITY_ID', value)
	},
	setExpiresOn:({commit}, value) => {
		commit('SET_EXPIRES_ON', value)
	},
	setId:({commit}, value) => {
		commit('SET_ID', value)
	}
}