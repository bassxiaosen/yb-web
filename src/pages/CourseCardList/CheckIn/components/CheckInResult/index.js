import React, { Component } from 'react';
import styles from './CheckInResult.less';
import { Row, Col, Avatar, Table, Button, Menu, Dropdown, Icon, Popconfirm, Popover} from 'antd';

const MenuItem = Menu.Item

// function parseState(state) {
//   switch (state) {
//     case 1:
//       return '签到成功'
//     case 2:
//       return '迟到'
//     case 3:
//       return '请假'
//     case 4:
//       return '旷课'
//     case 5:
//       return '签到成功（定位失败）'
//     case 6:
//       return '签到成功（未开启定位）'
//   }
// }

function parseState(state) {
  switch (state) {
    case 0:
      return '待签到'
    case 1:
      return '已签到'
    case 2:
      return '请假'
    case 3:
      return '旷课'
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
    const { checkInStudent, noCheckInStudent, handleDeleteAttendance, handleChangeDetailPage, total, tableLoading, count, rate, time } = this.props;
    const { currentPage, detailData, handleUpdateAttendance } = this.props
    const checkInNum = checkInStudent.length; //出勤人数
    const columns = [
      {
        dataIndex: 'student.studentNum',
        key: 'studentNum',
        title: '学生学号',
      },
      {
        dataIndex: 'student.truename',
        key: 'truename',
        title: '学生姓名',
      },
      {
        dataIndex: 'state',
        key: 'state',
        title: '学生出勤情况',
        render: (text, record) => {
          const {studentId, truename} = record.student
          return (
            <Popover
              title={`修改${truename}出勤情况`}
              content={
                <span>
                  <a
                    onClick={() => {handleUpdateAttendance(studentId, 0)}}
                  >待签到 </a>
                  <a
                    onClick={() => {handleUpdateAttendance(studentId, 1)}}
                  >已签到 </a>
                  <a
                    onClick={() => {handleUpdateAttendance(studentId, 2)}}
                  >请假 </a>
                  <a
                    onClick={() => {handleUpdateAttendance(studentId, 3)}}
                  >旷课</a>
                </span>
              }
            >
              <a
                // overlay={
                //   (<Menu>
                //     <MenuItem>
                //       <a>签到成功</a>
                //     </MenuItem>
                //   </Menu>)
                // }
              >
                {record.clockInId}
                {parseState(text)} <Icon type="edit"/>
              </a>
            </Popover>
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
            本次签到开启于 {time}
            <Popconfirm
              title="确认删除此签到详情，删除后无法恢复"
              onConfirm={handleDeleteAttendance}
            >
              <Button
              type="danger"
              size="small"
              style={{float: 'right'}}
              >
              删除</Button>
            </Popconfirm>
          </p>
          <Row>
            <Col className={styles.updown} span={12}>
              <span>出勤</span>
              <span>
                <span className={styles.bigSpan}>{count}</span>人
              </span>
            </Col>
            <Col className={styles.updown} span={12}>
              <span>出勤率</span>
              <span>
                <span className={styles.bigSpan}>{rate}</span>%
              </span>
            </Col>
            {/* <Col className={styles.updown} span={8}>
              <span>签到开启时长</span>
              <span>
                <span>
                  <span className={styles.bigSpan}>1</span>分
                </span>
                <span>
                  <span className={styles.bigSpan}>0</span>秒
                </span>
              </span>
            </Col> */}
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
          dataSource={detailData}
          loading={tableLoading}
          rowKey={record => record.clockInId}
        />
      </div>
    );
  }
}
