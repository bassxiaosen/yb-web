import React, { Component } from 'react';
import {
  Card,
  Table,
  Row,
  Col,
  Input,
  Button,
  Upload,
  Icon,
  Divider,
  Popconfirm,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';
import router from 'umi/router';
import { ChartCard } from "@/components/Charts"
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";


const Search = Input.Search;
export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          clockTime: '2019-04-10 15:00',
          isGPS: '是',
          status: '已签到',
        },
      ],
      visible: false,
      current: {},
      currentPage: 2,
    };
    this.modalForm = React.createRef();
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  openModal = record => {
    const ref = this.modalForm.current;
    ref.setFieldsValue(record);
    this.setState({ current: record, visible: true });
  };

  handleOk = value => {
    console.log(value);
  };

  onClickDelete = id => {
    message.success(`删除学生id：${id}`);
  };

  handleSearch = () => {
    console.log('搜索');
  };

  render() {
    const { data, currentPage } = this.state;
    const { match } = this.props;
    const dataV = [
      {
        year: "1991",
        value: 3
      },
      {
        year: "1992",
        value: 4
      },
      {
        year: "1993",
        value: 3.5
      },
      {
        year: "1994",
        value: 5
      },
      {
        year: "1995",
        value: 4.9
      },
      {
        year: "1996",
        value: 6
      },
      {
        year: "1997",
        value: 7
      },
      {
        year: "1998",
        value: 9
      },
      {
        year: "1999",
        value: 13
      }
    ];
    const cols = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };
    const columns = [
      {
        dataIndex: 'clockTime',
        key: 'clockTime',
        title: '考勤时间',
      },
      {
        dataIndex: 'isGPS',
        key: 'isGPS',
        title: '是否开启定位',
      },
      {
        dataIndex: 'status',
        key: 'status',
        title: '考勤状态',
      },
      // {
      //   dataIndex: 'subject',
      //   key: 'subject',
      //   title: '学生班级',
      // },
      // {
      //   key: 'operation',
      //   title: '操作',
      //   render: (text, record) => (
      //     <span>
      //       <a onClick={this.openModal.bind(this, record)}>修改</a>
      //       <Divider type="vertical" />
      //       <Popconfirm
      //         title="确认删除此学生？"
      //         onConfirm={this.onClickDelete.bind(this, record.id)}
      //       >
      //         <a href="javascript:;">删除</a>
      //       </Popconfirm>
      //     </span>
      //   ),
      // },
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
      <PageHeaderWrapper title="课程详情">
        <Card>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程名称：C语言</Col>
              <Col span={6}>任课教师：张三</Col>
              <Col span={6}>开课时间：2015上</Col>
              <Col span={6}>课程总学生人数：医学信息工程学院</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程总人数：85人</Col>
              <Col span={6}>上课班级：15医工计算机4</Col>
              <Col span={6}>总考勤次数：10次</Col>
              <Col span={6}>个人出勤次数：9次</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程平均出勤率：90%</Col>
              <Col span={6}>个人出勤率：90%</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={24}>
                <ChartCard
                  title="课程出勤率"
                  total={`平均：${90}%`}
                  action={
                    <div>
                      <a>周</a>/
                      <a>月</a>/
                      <a>半年</a>
                    </div>
                  }
                >
                  <Chart height={400} data={dataV} scale={cols} forceFit>
                      <Axis name="year" />
                      <Axis name="value" />
                      <Tooltip
                        crosshairs={{
                          type: "y"
                        }}
                      />
                      <Geom type="line" position="year*value" size={2} />
                      <Geom
                        type="point"
                        position="year*value"
                        size={4}
                        shape={"circle"}
                        style={{
                          stroke: "#fff",
                          lineWidth: 1
                        }}
                      />
                    </Chart>
                </ChartCard>
              </Col>
            </Row>
          </div>
          {/* <div className={styles.header}>
            <Row gutter={24}>
              <Col span={8}>
                <Input placeholder="输入学号搜索" />
              </Col>
              <Col span={8}>
                <Input placeholder="输入姓名搜索" />
              </Col>
              <Col span={8}>
                <Button type="primary" onClick={this.handleSearch}>
                  查询
                </Button>
              </Col>
            </Row>
          </div> */}
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={data}
            rowKey={record => record.number}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
