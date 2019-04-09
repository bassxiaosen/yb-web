import React, { Component } from 'react';
import styles from './CheckInResult.less';
import { Row, Col, Avatar } from 'antd';

export default class CheckInResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { checkInStudent, noCheckInStudent } = this.props;
    const checkInNum = checkInStudent.length; //出勤人数
    return (
      <div>
        <section className={styles.resultData}>
          <p>本次签到开启于 2019-01-30 15:35:24</p>
          <Row>
            <Col className={styles.updown} span={8}>
              <span>出勤</span>
              <span>
                <span className={styles.bigSpan}>{checkInNum}</span>人
              </span>
            </Col>
            <Col className={styles.updown} span={8}>
              <span>出勤率</span>
              <span>
                <span className={styles.bigSpan}>{50}</span>%
              </span>
            </Col>
            <Col className={styles.updown} span={8}>
              <span>签到开启时长</span>
              <span>
                <span>
                  <span className={styles.bigSpan}>1</span>分
                </span>
                <span>
                  <span className={styles.bigSpan}>0</span>秒
                </span>
              </span>
            </Col>
          </Row>
        </section>
        已签到学生：
        {checkInStudent.length ? (
          <Row style={{ padding: '10px 12px 0' }}>
            {checkInStudent.map(student => (
              <Col style={{ marginBottom: '12px' }} key={student.id} span={2}>
                <Avatar size="large">{student.name}</Avatar>
              </Col>
            ))}
          </Row>
        ) : null}
      </div>
    );
  }
}
