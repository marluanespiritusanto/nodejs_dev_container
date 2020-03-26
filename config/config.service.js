export class ConfigService {
  static get(name) {
    return process.env[name];
  }
}
