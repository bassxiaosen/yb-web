import React, { Component } from 'react';
import styles from './CheckInResult.less';
import { Row, Col, Avatar, Table, Button, Menu, Dropdown, Icon} from 'antd';

const MenuItem = Menu.Item

function parseState(state) {
  switch (state) {
    case 1:
      return '签到成功'
    case 2:
      return '迟到'
    case 3:
      return '请假'
    case 4:
      return '旷课'
    case 5:
      return '签到成功（定位失败）'
    case 6:
      return '迟到（未开启定位）'
  }
}
export default class CheckInResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  render() {
    const { checkInStudent, noCheckInStudent, handleDeleteAttendance, handleChangeDetailPage, total } = this.props;
    const { currentPage, detailData } = this.props
    const checkInNum = checkInStudent.length; //出勤人数
    const columns = [
      {
        dataIndex: 'studentNum',
        key: 'studentNum',
        title: '学生学号',
      },
      {
        dataIndex: 'truename',
        key: 'truename',
        title: '学生姓名',
      },
      {
        dataIndex: 'state',
        key: 'state',
        title: '学生出勤情况',
        render: (text, record) => {
          return (
            <a
              // overlay={
              //   (<Menu>
              //     <MenuItem>
              //       <a>签到成功</a>
              //     </MenuItem>
              //   </Menu>)
              // }
            >
              {parseState(text)} <Icon type="edit"/>
            </a>
          )
        }
      }
    ];
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total,
      onChange: page => {
        handleChangeDetailPage(page)
        // this.setState({ currentPage: page });
      },
    };

    return (
      <div>
        <section className={styles.resultData}>
          <p>
            本次签到开启于 2019-04-15 15:35:24
            <Button
            type="danger"
            size="small"
            style={{float: 'right'}}
            onClick={handleDeleteAttendance}>删除</Button>
          </p>
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
              studentNum: '2015081004',
              truename: '蔡宇森',
              state: 1,
            }
          ]}
          rowKey={record => record.studentNum}
        />
      </div>
    );
  }
}
