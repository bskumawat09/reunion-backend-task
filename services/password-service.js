const bcrypt = require("bcrypt");

class PasswordService {
	async hashPassword(password) {
		const hash = await bcrypt.hash(password, 12);
		return hash;
	}

	async verifyPassword(inputPass, storedPass) {
		const isMatched = await bcrypt.compare(inputPass, storedPass);
		return isMatched;
	}
}

module.exports = new PasswordService();
