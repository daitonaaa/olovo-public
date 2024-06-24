import { CancelTokenSource, ResponseType } from 'axios'

export class HttpOptions {
  _headers: { [header: string]: string }
  _withCredentials: boolean
  _responseType: ResponseType
  _timeout: number
  _cancelTokenSource: CancelTokenSource

  constructor() {
    this._withCredentials = true
    this._responseType = 'json'
    this._timeout = 10000
    this._headers = {}
  }

  withCredentials(flag: boolean): HttpOptions {
    this._withCredentials = flag
    return this
  }

  responseType(type: ResponseType): HttpOptions {
    this._responseType = type
    return this
  }

  timeout(n: number): HttpOptions {
    this._timeout = n
    return this
  }

  setHeader(name: string, value: string): HttpOptions {
    this._headers[name] = value
    return this
  }

  setCancelToken(source: CancelTokenSource): this {
    this._cancelTokenSource = source
    return this
  }
}
