import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import CountDown from '@/components/CountDown';
import { Button } from 'antd';
export default class CheckInArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { checkInQRCodeID, targetTime, handleEndCheckIn } = this.props;
    const url = `https://oauth.yiban.cn/code/html?client_id=0ac9a8dfb4fcf79f&redirect_uri=http://f.yiban.cn/iapp318668&state=`;
    return (
      <div>
        <p style={{ textAlign: 'center' }}>
          <CountDown
            target={targetTime}
            style={{ fontSize: '64px' }}
            onEnd={() => {
              handleEndCheckIn();
            }}
          />
        </p>
        {checkInQRCodeID && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ textAlign: 'center' }}>请扫码签到：</p>
            <QRCode style={{ margin: 'auto' }} size={192} value={`${url}${checkInQRCodeID}`} />
            <Button
              style={{ marginTop: '16px' }}
              type="primary"
              onClick={() => {
                handleEndCheckIn(true);
              }}
            >
              关闭签到
            </Button>
          </div>
        )}
      </div>
    );
  }
}
