let create = (from, to, subject, detail) => {
	return {
		timestamp: Date.now(),
		from,
		to,
		subject,
		detail
	}
}

let valid = message => {
	return message.from !== undefined
}

module.exports = {create, valid}

