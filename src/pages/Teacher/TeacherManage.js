import React, { PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import moment from 'moment';
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
  Upload,
} from 'antd';
import styles from './TeacherManage.less';
import EditTeacher from './EditTeacher';
import qs from 'qs'
import request from "@/utils/request"
import url from "@/utils/url"

const { Search } = Input;
const { Option } = Select

class TeacherManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 页面加载状态
      loading: true,
      // 表格数据
      data: [],
      visible: false,
      current: {},
      // 分页数据
      currentPage: 1,
      total: 0,
      // 添加修改下拉框数据
      academyArr: [],
      // 查询部分
      teacherNum: '',
      truename: '',
      academyId: '',
      sortByTeacherNum: 0,
    };
    this.modalForm = React.createRef();
  }

  async componentDidMount() {
    await this.getAcademyData()
    await this.getTeacherData()
  }

  getTeacherData = () => {
    this.setState({
      loading: true
    })
    const { teacherNum, truename, academyId, currentPage, sortByTeacherNum } = this.state
    return request(`${url}/teacher/search/${currentPage}/10`, {
      method: 'POST',
      body: {
        teacherNum, academyId, truename, sortByTeacherNum
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
      message.error(err)
    })
  }

  getAcademyData = () => {
    return request(`${url}/academy/search/1/100000`, {
      method: 'POST'
    }).then(response => {
      const { data: { content } } = response
      this.setState({
        academyArr: content
      })
    }).catch(e => {
      message.error(e)
    })
  }

  postTeacherData = (obj) => {
    this.setState({
      loading: true
    })
    return request(`${url}/teacher`, {
      method: 'POST',
      body: obj
    }).then((data) => {
      if (this.state.current.teacherId) {
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

  deleteTeacherData = (teacherId) => {
    this.setState({
      loading: true
    })
    return request(`${url}/teacher/${teacherId}`,{ method: 'DELETE' })
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

  openModal = async record => {
    const ref = this.modalForm.current;
    ref.setFieldsValue(record);
    this.setState({ current: record, visible: true });
  };

  handleOk = async value => {
    await this.postTeacherData(value)
    await this.getTeacherData()
  };

  onClickDelete = async id => {
    console.log(id)
    await this.deleteTeacherData(id)
    await this.getTeacherData()
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
    this.getTeacherData()
    console.log('搜索');
  };

  render() {
    const { data, currentPage, academyArr, total, loading } = this.state;
    const columns = [
      { title: '教师工号', dataIndex: 'teacherNum', key: 'teacherNum' },
      { title: '教师姓名', dataIndex: 'truename', key: 'truename' },
      { title: '教师所属学院', dataIndex: 'academy', key: 'academy' },
      {
        title: '教师任教课程',
        key: 'course',
        render: (text, record, index) => (
          <span>
            <a>查看课程</a>
          </span>
        )
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record, index) => (
          <span>
            <a onClick={this.openModal.bind(this, record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除此教师？"
              onConfirm={this.onClickDelete.bind(this, record.teacherId)}
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
          this.getTeacherData()
        });
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.header}>
            <Row gutter={24} style={{ marginBottom: '16px' }}>
              <Col span={4}>
                <Button disabled={loading} type="primary" onClick={this.openModal.bind(this, {})}>
                  添加教师
                </Button>
              </Col>
              <Col span={4}>
                <Upload
                  disabled = {loading}
                >
                  <Button disabled={loading}>
                    <Icon type="upload" /> 批量导入
                  </Button>
                </Upload>
              </Col>
              <Col span={6}>
                <Input
                  allowClear
                  disabled = {loading}
                  onChange = {this.handleChangeSearch.bind(this, 'truename')}
                  placeholder="输入姓名进行查询" />
              </Col>
              <Col span={8} offset={2}>
                <Input
                  allowClear
                  disabled = {loading}
                  onChange = {this.handleChangeSearch.bind(this, 'teacherNum')}
                  placeholder="输入工号进行查询" />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4}>
                <Button type="primary" disabled={loading} onClick={this.handleSearch}>
                  搜索
                </Button>
              </Col>
              <Col span={10}>
                <Select
                  onChange={this.handleChangeSearch.bind(this, 'academyId')}
                  style={{ width: '100%' }}
                  allowClear
                  disabled={loading}
                  placeholder="选择学院">
                  {academyArr.map((item, index) => {
                    return (
                      <Option key={item.academyId} value={item.academyId}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              {/* <Col span={8} offset={2}>
                <Input placeholder="输入课程名称进行查询" />
              </Col> */}
            </Row>
          </div>

          <Table loading={loading} rowKey={record => record.teacherId} dataSource={data} columns={columns} pagination={pagination}/>
        </Card>
        <EditTeacher
          ref={this.modalForm}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          current={this.state.current}
          academyArr={this.state.academyArr}
        />
      </PageHeaderWrapper>
    );
  }
}

export default TeacherManage;
