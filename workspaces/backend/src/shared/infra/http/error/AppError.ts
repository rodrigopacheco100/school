export default class AppError {
  public readonly message: string | string[];

  public readonly status: number;

  constructor(message: string | string[], status = 400) {
    this.message = message;
    this.status = status;
  }
}
