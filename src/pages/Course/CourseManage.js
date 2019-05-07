import React, { PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Table,
  Popconfirm,
  Upload
} from 'antd';
import styles from './styles.less';
import EditCourse from './EditCourse';
import qs from 'qs'
import request from "@/utils/request"
import url from "@/utils/url"

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

class CourseManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      academyArr: [],
      classArr: [],
      teacherArr: [],
      visible: false,
      current: {},
      currentPage: 1,
      total: 0,
      // 查询数据
      name: '', // 课程名称
      className: '', // 班级名称
      giveDate: '', // 开课时间
      academyId: '', // 学院id
      teacherTruename: '', // 教师姓名
      sortField: '',
      direction: 1,
    };
    this.modalForm = React.createRef();
  }

  async componentDidMount() {
    await this.getAcademyData()
    await this.getTeacherData()
    await this.getClassData()
    await this.getCourseData()
  }

  getCourseData = () => {
    this.setState({
      loading: true
    })
    const { name, teacherTruename, academyId, className, giveDate, currentPage, sortField, direction } = this.state
    return request(`${url}/course/search/${currentPage}/10`, {
      method: 'POST',
      body: {
        name,
        academy: {
          academyId,
        },
        classs: {
          name: className
        },
        teacher: {
          teacherId: '',
          truename: teacherTruename,
        },
        giveDate,
        direction,
        sortField
      }
    }).then((response) => {
      const { data } = response
      const { content, size, totalElements } = data
      this.setState({
        data: content,
        loading: false,
        total: totalElements
      })
    }).catch((err) => {
      message.error('获取课程数据失败')
      console.log(err)
    })
  }

  getAcademyData = () => {
    return request(`${url}/academy/search/1/10000`, {
      method: 'POST'
    }).then(response => {
      const { data: { content } } = response
      this.setState({
        academyArr: content,
      })
    }).catch(e => {
      message.error('获取学院数据失败')
    })
  }

  getClassData = () => {
    return request(`${url}/classs/search/1/10000`, {
      method: 'POST',
      body: {
        sortByName: 0
      }
    }).then(response => {
      const { data: { content } } = response
      this.setState({
        classArr: content,
      })
    }).catch(e => {
      message.error('获取班级数据失败')
    })
  }

  getTeacherData = () => {
    return request(`${url}/teacher/search/1/10000`, {
      method: 'POST',
      body: {
        sortByTeacherNum: 0
      }
    }).then(response => {
      const { data: { content } } = response
      this.setState({
        teacherArr: content,
      })
    }).catch(e => {
      message.error('获取教师数据失败')
    })
  }

  postCourseData = (obj) => {
    this.setState({
      loading: true
    })
    const {academyId, classsId, teacherId} = obj
    let postObj = {}
    if (this.state.current.courseId) {
      const {courseId} = this.state.current
      postObj = {
        ...obj,
        courseId,
        academy: {
          academyId
        },
        classs: {
          classsId
        },
        teacher: {
          teacherId
        }
      }
    } else {
      postObj = {
        ...obj,
        academy: {
          academyId
        },
        classs: {
          classsId
        },
        teacher: {
          teacherId
        }
      }
    }
    return request(`${url}/course`, {
      method: 'POST',
      body: postObj
    }).then((data) => {
      if (this.state.current.courseId) {
        this.setState({loading: false})
        message.success('修改成功')
      } else {
        message.success('添加成功')
      }
    }).catch((err) => {
      console.log(err)
      // message.error(err)
    })
  }

  deleteCourseData = (courseId) => {
    this.setState({
      loading: true
    })
    return request(`${url}/course/${courseId}`,{ method: 'DELETE' })
      .then((response) => {
        this.setState({loading: false})
        message.success('删除成功')
      }).catch((err) => {
        console.log(err)
        // message.error(err)
      })
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  openModal = record => {
    const ref = this.modalForm.current;
    // if (Object.keys(record).length === 0) {
    //   ref.setFieldsValue({});
    //   this.setState({ current: record, visible: true });
    // } else {
    //   //拷贝对象，并将日期转化为Moment对象
    //   const copy = Object.assign({}, record);
    //   const { time } = copy;
    //   let timeArr = time.map(item => moment(item));
    //   copy.time = timeArr;
      if (record.courseId) {
        ref.setFieldsValue({
          ...record,
          academyId: record.academy.academyId,
          classsId: record.classs.classsId,
          teacherId: record.teacher.teacherId
        });
      } else {
        ref.setFieldsValue(record)
      }
      this.setState({ current: record, visible: true });
    // }
  };

  handleOk = async value => {
    await this.postCourseData(value)
    await this.getCourseData()
  };

  onClickDelete = async id => {
    await this.deleteCourseData(id)
    await this.getCourseData()
  };

  handleChangeSearch = (key, event) => {
    if (key === 'academyId') {
      this.setState({
        [key]: event
      })
    } else {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  handleSearch = () => {
    this.getCourseData()
  };

  render() {
    const { data, currentPage, total, academyArr, classArr, teacherArr, loading } = this.state;
    const columns = [
      {
        title: '课程名称',
        dataIndex: 'courseName',
        key: 'name',
        render: (text, record) => (
          <Link to={`courseManage/courseDetail/${record.courseId}`}>{record.name}</Link>
        ),
      },
      { title: '课程所属学院', dataIndex: 'academy.name', key: 'academyName' },
      { title: '上课班级', dataIndex: 'classs.name', key: 'className' },
      { title: '任教老师', dataIndex: 'teacher.truename', key: 'teacher_truename' },
      { title: '课程时间', dataIndex: 'giveDate', key: 'giveDate' },
      { title: '课程人数', dataIndex: 'studentCount', key: 'studentCount' },
      // { title: '上课人数', dataIndex: 'renshu', key: 'renshu' },
      // {
      //   title: '开课时间',
      //   dataIndex: 'time',
      //   key: 'number',
      //   render: (text, record) => {
      //     const { start, end } = record.time;
      //     return (
      //       <span>
      //         {moment(start).format('YYYY/MM/DD')} - {moment(end).format('YYYY/MM/DD')}
      //       </span>
      //     );
      //   },
      // },
      // {
      //   title: '教师',
      //   dataIndex: 'teacher',
      //   key: 'course',
      //   render: (text, record) => (
      //     <span>{Array.isArray(record.teacher) ? record.teacher.join('，') : record.teacher}</span>
      //   ),
      // },
      {
        title: '操作',
        key: 'operation',
        render: (text, record, index) => (
          <span>
            <a onClick={this.openModal.bind(this, record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除此课程？"
              onConfirm={this.onClickDelete.bind(this, record.courseId)}
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total,
      onChange: page => {
        this.setState({ currentPage: page }, () => {
          this.getCourseData()
        });
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.header}>
            <Row gutter={24} style={{ marginBottom: '16px' }}>
              <Col span={4}>
                <Button type="primary" disabled={loading} onClick={this.openModal.bind(this, {})}>
                  添加课程
                </Button>
              </Col>
              <Col span={4}>
                <Upload disabled={loading}>
                  <Button disabled={loading}>
                    <Icon type="upload" /> 批量导入
                  </Button>
                </Upload>
              </Col>
              <Col span={8}>
                <Input onChange={this.handleChangeSearch.bind(this, 'name')} disabled={loading} placeholder="输入课程名称进行查询" allowClear />
              </Col>
              <Col span={8}>
                <Input onChange={this.handleChangeSearch.bind(this, 'giveDate')} disabled={loading} placeholder="输入课程时间进行查询" allowClear />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4}>
                <Button disabled={loading} type="primary" onClick={this.handleSearch}>
                  搜索
                </Button>
              </Col>
              <Col span={6}>
                <Input onChange={this.handleChangeSearch.bind(this, 'className')} disabled={loading} placeholder="输入上课班级查询" allowClear />
              </Col>
              <Col span={6}>
                <Select onChange={this.handleChangeSearch.bind(this, 'academyId')} disabled={loading} style={{ width: '100%' }} allowClear placeholder="选择学院">
                  {academyArr.map((item, index) => {
                    return (
                      <Option key={item.academyId} value={item.academyId}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              {/* <Col span={4}>
                <Input placeholder="输入教师工号" allowClear />
              </Col> */}
              <Col span={8}>
                <Input onChange={this.handleChangeSearch.bind(this, 'teacherTruename')} disabled={loading} placeholder="输入教师名称" allowClear />
              </Col>
            </Row>
          </div>

          <Table
            loading={loading}
            pagination={pagination}
            rowKey={record => record.courseId}
            dataSource={data}
            columns={columns}
          />
        </Card>
        <EditCourse
          ref={this.modalForm}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          current={this.state.current}
          academyArr={this.state.academyArr}
          classArr={this.state.classArr}
          teacherArr={this.state.teacherArr}
        />
      </PageHeaderWrapper>
    );
  }
}

export default CourseManage;
