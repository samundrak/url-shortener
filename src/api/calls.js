import * as API from './index';
import HttpClient from '../core/HttpClient';

const openHttpClient = HttpClient.api();

export function shortenUrl(payload) {
  return openHttpClient.post(API.SHORTEN_URL, payload);
}
