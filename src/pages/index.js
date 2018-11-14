import React from 'react';
import renderIf from 'render-if';
import { Spin, Row, Col, Input, Icon, message, Card, Button, Checkbox } from 'antd';
import App from '../App';
import { shortenUrl } from '../api/calls';

const { Search } = Input;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Home extends React.Component {
  constructor() {
    super();
    this.urlsStacks = new Map();
    this.handleLongUrlChange = this.handleLongUrlChange.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleAliasStateChnage = this.handleAliasStateChnage.bind(this);
    this.handleAliasChange = this.handleAliasChange.bind(this);
    this.state = {
      isLoading: false,
      isAlias: false,
      aliasForShorUrl: '',
      longUrl: '',
      lastShortenData: {},
    };
  }
  handleAliasChange(event) {
    this.setState({
      aliasForShorUrl: event.target.value,
    });
  }
  handleAliasStateChnage() {
    this.setState({
      isAlias: !this.state.isAlias,
    });
  }
  handleLongUrlChange(event) {
    this.setState({
      longUrl: event.target.value,
    });
  }
  handleCopy() {
    const input = document.createElement('input');
    input.value = this.state.lastShortenData.shortUrl;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    message.info('Copied to your clipboard.');
  }
  handleOnSearch() {
    return (value) => {
      if (!value) return false;
      if (this.urlsStacks.has(value)) {
        return this.setState({
          longUrl: '',
          lastShortenData: { shortUrl: this.urlsStacks.get(value), longUrl: value },
        });
      }
      this.setState({
        isLoading: true,
        lastShortenData: {},
      });
      return shortenUrl({ url: value, aliasForShorUrl: this.state.aliasForShorUrl, isAlias: this.state.isAlias })
        .then((response) => {
          const { data } = response;
          this.setState({
            isAlias: false,
            aliasForShorUrl: '',
            isLoading: false,
            longUrl: '',
            lastShortenData: { shortUrl: data.short_url, longUrl: this.state.longUrl },
          });
          this.urlsStacks.set(value, data.short_url);
        })
        .catch((err) => {
          this.setState({
            isLoading: false,
          });
          if (err.response && err.response.data) {
            if (err.response.data.message && !err.response.data.data) {
              message.error(err.response.data.message);
            }
            return err.response.data.data.forEach((msg) => {
              message.error(msg);
            });
          }
          return message.error('Unable to shorten URL please try again!');
        });
    };
  }
  render() {
    return (
      <App>
        <div>
          <Row>
            <Col span={20}>
              <i>
                <b>
                  Welcome to URLShortener! Are you sick of posting URLs in emails only to have it break when sent causing the recipient to have to cut
                  and paste it back together? Then you have come to the right place. By entering in a URL in the text field below, we will create a
                  tiny URL that will not break in email postings and never expires.
                </b>
              </i>
            </Col>
          </Row>
          <br />
          <Row>
            <Spin indicator={antIcon} spinning={this.state.isLoading}>
              <Col span={2} />
              <Col span={20}>
                {' '}
                <Search
                  value={this.state.longUrl}
                  onChange={this.handleLongUrlChange}
                  enterButton="Shorten url"
                  placeholder="Enter your long url"
                  onSearch={this.handleOnSearch()}
                />
                <br />
                <Checkbox checked={this.state.isAlias} onChange={this.handleAliasStateChnage}>
                  Add Alias
                </Checkbox>
                {renderIf(this.state.isAlias)(
                  <Input placeholder="Enter Alias" value={this.state.aliasForShorUrl} onChange={this.handleAliasChange} />,
                )}
                <br />
                {renderIf(this.state.lastShortenData.shortUrl)(
                  <Card bordered>
                    <p>
                      Shorten URL:{' '}
                      <a href={this.state.lastShortenData.shortUrl} target="_blank" rel="noopener">
                        {this.state.lastShortenData.shortUrl}
                      </a>{' '}
                      <Button type="dashed" onClick={this.handleCopy}>
                        Copy
                      </Button>
                    </p>
                    <p>
                      Original URL:{' '}
                      <a href={this.state.lastShortenData.longUrl} target="_blank" rel="noopener">
                        {this.state.lastShortenData.longUrl}
                      </a>
                    </p>
                  </Card>,
                )}
              </Col>
              <Col span={2} />
            </Spin>
          </Row>
        </div>
      </App>
    );
  }
}

export default Home;
