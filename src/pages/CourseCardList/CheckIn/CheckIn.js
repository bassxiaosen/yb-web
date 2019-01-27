import React, { Component } from 'react';
import { Card, Layout, message, Button, Switch, InputNumber } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';
import HistorySider from './components/HistorySider/index';
import CheckInArea from './components/CheckInArea/index';

const { Sider, Content } = Layout;

export default class CheckIn extends Component {
  constructor(props) {
    super(props);
    const targetTime = new Date().getTime();
    this.state = {
      isGPS: true,
      newCheckIn: false,
      visibleCheckPage: true,
      checkInQRCodeID: '',
      checkInMin: 5,
      targetTime,
      historyData: [
        {
          id: '1',
          date: '2019-1-27',
          data: [
            { checkInId: '1hasaggjiuia9835', time: '14:33', checkInNum: 30, rate: '50%' },
            { checkInId: '2ashihgayg875478', time: '17:33', checkInNum: 32, rate: '52%' },
          ],
        },
        {
          id: '2',
          date: '2019-1-24',
          data: [
            { checkInId: '1iausgiugag786387', time: '09:33', checkInNum: 60, rate: '100%' },
            { checkInId: '2ajhhguiauh845934', time: '13:20', checkInNum: 50, rate: '83%' },
          ],
        },
      ],
    };
  }

  handleClickSiderHistory = checkInId => {
    this.setState(
      {
        visibleCheckPage: false,
        newCheckIn: false,
      },
      () => console.log(this.state.newCheckIn, this.state.visibleCheckPage)
    );
    message.success(checkInId);
  };

  handleChangeGPS = checked => {
    this.setState({ isGPS: checked }, () => console.log(this.state.isGPS));
  };

  handleChangeCheckInMin = value => {
    this.setState({
      checkInMin: value,
    });
  };

  handleOpenNewCheckIn = () => {
    console.log(this.state.newCheckIn);
    const min = this.state.checkInMin;
    const targetTime = new Date().getTime() + min * 60 * 1000;
    this.setState(
      {
        targetTime,
        checkInQRCodeID: 'adgo83760asahiua',
        newCheckIn: true,
        visibleCheckPage: true,
      },
      () => console.log(this.state.newCheckIn, this.state.visibleCheckPage)
    );
  };

  handleEndCheckIn = isManual => {
    //签到结束后，应该去除二维码，显示签到结果，重设二维码
    if (isManual) {
      const targetTime = new Date().getTime();
      this.setState({
        targetTime,
        newCheckIn: false,
        checkInQRCodeID: '',
      });
      return console.log('手动结束');
    }
    this.setState({ newCheckIn: false, checkInQRCodeID: '' });
    console.log('结束');
  };

  render() {
    const {
      historyData,
      isGPS,
      newCheckIn,
      visibleCheckPage,
      checkInQRCodeID,
      checkInMin,
      targetTime,
    } = this.state;
    const myStyles = {
      startCheckArea: {
        border: '2px dashed #c8c8c8',
        backgroundColor: '#f2f2f2',
        padding: '10px 8px',
        marginBottom: '10px',
        marginLeft: '12px',
        marginRight: '12px',
        textAlign: 'center',
      },
    };

    return (
      <PageHeaderWrapper>
        <Card>
          <Layout>
            <Sider className={styles.checkInSider}>
              <header className={styles.siderHeader}>课程总人数：60人</header>
              <div style={myStyles.startCheckArea}>
                {newCheckIn ? (
                  '签到中'
                ) : (
                  <>
                    <Button
                      onClick={this.handleOpenNewCheckIn}
                      style={{ marginBottom: '10px' }}
                      icon="plus"
                      type="primary"
                    >
                      开启新签到
                    </Button>
                    <Switch
                      onChange={this.handleChangeGPS}
                      style={{ marginBottom: '10px' }}
                      checked={isGPS}
                    />{' '}
                    GPS定位
                    <InputNumber
                      onChange={this.handleChangeCheckInMin}
                      value={checkInMin}
                      size="small"
                      min={0}
                      max={60}
                    />{' '}
                    分钟
                  </>
                )}
              </div>
              <HistorySider
                handleClickSiderHistory={this.handleClickSiderHistory}
                historyData={historyData}
              />
            </Sider>
            <Content>
              {visibleCheckPage ? (
                <CheckInArea
                  checkInQRCodeID={checkInQRCodeID}
                  targetTime={targetTime}
                  handleEndCheckIn={this.handleEndCheckIn}
                />
              ) : (
                '签到结果页面'
              )}
            </Content>
          </Layout>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
