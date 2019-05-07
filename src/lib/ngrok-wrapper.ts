/**
 * @file Ngrok wrapper to gen and protect the URI
 * @author Mattamorphic
 */

import ngrok from 'ngrok';

/**
 * Ngrok wrapper class
 */
export class NgrokWrapper {

  // The generated URI
  private url: string;

  // The port to expose
  private port: number;

  /**
   * Configure the instance variables
   *
   * @param {number} port The port to expose
   */
  public constructor(port: number) {
    this.port = port;
    this.url = '';
  }

  /**
   * Gen the URI using ngrok
   *
   * @return {Promise<string>}
   */
  public async gen(): Promise<string> {
    try {
      this.url = await ngrok.connect(this.port);
      return this.url;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Fetch the URI from the instance variable
   *
   * @return {string}
   */
  public get(): string {
    return this.url;
  }
}
