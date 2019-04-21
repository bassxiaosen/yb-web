import React, { Component } from 'react';
import styles from './CheckInResult.less';
import { Row, Col, Avatar, Table} from 'antd';

export default class CheckInResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  render() {
    const { checkInStudent, noCheckInStudent } = this.props;
    const { currentPage } = this.props
    const checkInNum = checkInStudent.length; //出勤人数
    const columns = [
      {
        dataIndex: 'number',
        key: 'number',
        title: '学生学号',
      },
      {
        dataIndex: 'name',
        key: 'name',
        title: '学生姓名',
      },
      {
        dataIndex: 'isGPS',
        key: 'isGPS',
        title: '是否开启定位',
      },
      {
        dataIndex: 'status',
        title: '学生出勤情况',
        render: (record, text) => {
          if(record.status === 1) {
            return '已签到'
          } else {
            return '请假'
          }
        }
      }
    ];
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total: 100,
      onChange: page => {
        this.setState({ currentPage: page });
      },
    };

    return (
      <div>
        <section className={styles.resultData}>
          <p>本次签到开启于 2019-04-15 15:35:24</p>
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
        出勤详情：
        {/* {checkInStudent.length ? (
          <Row style={{ padding: '10px 12px 0' }}>
            {checkInStudent.map(student => (
              <Col style={{ marginBottom: '12px' }} key={student.id} span={2}>
                <Avatar size="large">{student.name}</Avatar>
              </Col>
            ))}
          </Row>
        ) : null} */}
        <Table
          columns={columns}
          pagination={pagination}
          dataSource={[
            {
              number: '2015081004',
              name: '蔡宇森',
              isGPS: '是',
              status: 1,
            }
          ]}
          rowKey={record => record.number}
        />
      </div>
    );
  }
}
