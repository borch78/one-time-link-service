export class LinkIsNotActiveError extends Error {
  constructor(message = 'Link is not active') {
    super(message);
  }
}
