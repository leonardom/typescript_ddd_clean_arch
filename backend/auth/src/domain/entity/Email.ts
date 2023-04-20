const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Email {
  constructor(readonly value: string) {
    if (!this.isValid(value)) throw new Error(`Invalid email: ${value}`);
  }

  private isValid (email: string) {
		return String(email)
			.toLowerCase()
			.match(emailRegex);
	}
}