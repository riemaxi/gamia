module.exports = {
    desk: {
        port: 63334,
        home: './public'
    },

    system: {
		host: 'http://217.76.52.255:20000',

		credentials: {
			accesskey: 'XXXXXX',
			password: 'YYYYYYYYYYYYYYYYYYY',
			address: 'xxx.hub.team.gamia'
		},

		peers: {
			desks: [
				'xxxx.desk.team.gamia'
			],

			players: [
				'aaa.player.team.gamia',
				'bbb.player.team.gamia',
				'ccc.player.team.gamia',
				'ddd.player.team.gamia',
				'eee.player.team.gamia',
				'fff.player.team.gamia'
			]
		}
    },

	data: {
		game: {
			path: './data/game.json'
		}
	}
}