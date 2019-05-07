import React from 'react';
import {
  Table,
  message,
  Button,
  Input,
  Select,
  Row,
  Col,
  Card,
  Upload,
  Icon,
  Modal,
  Divider,
  Popconfirm,
} from 'antd';
import styles from './StudentManage.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditStudent from './EditStudent';
import qs from 'qs'
import request from "@/utils/request"
import url from "@/utils/url"

const Search = Input.Search;
const Option = Select.Option;

class StudentManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
      data: [],
      current: {},
      currentPage: 1,
      total: 0,
      academyArr: [], // 学院下拉框
      classArr: [], // 班级下拉框
      // 查询数据
      studentNum: '', // 学号
      truename: '', // 真实姓名
      academyId: '', // 学院id
      classsName: '', // 班级名称
      sortByStudentNum: 0,
    };
    this.modalForm = React.createRef();
  }

  async componentDidMount() {
    await this.getAcademyData()
    await this.getClassData()
    await this.getStudentData()
  }

  getStudentData = () => {
    this.setState({
      loading: true
    })
    const { studentNum, truename, academyId, classsName, currentPage, sortByStudentNum } = this.state
    return request(`${url}/student/search/${currentPage}/10`, {
      method: 'POST',
      body: {
        studentNum,
        truename,
        academy: {
          academyId,
        },
        classs: {
          classsName,
        },
        sortByStudentNum
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
      message.error('获取学生数据失败')
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

  postStudentData = (obj) => {
    this.setState({
      loading: true
    })
    const { academyId, classsId } = obj
    let postObj = {}
    if (this.state.current.studentId) {
      const {studentId} = this.state.current
      postObj = {
        ...obj,
        studentId,
        academy: {
          academyId
        },
        classs: {
          classsId
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
        }
      }
    }
    return request(`${url}/student`, {
      method: 'POST',
      body: postObj
    }).then((data) => {
      if (this.state.current.studentId) {
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

  deleteStudentData = (studentId) => {
    this.setState({
      loading: true
    })
    return request(`${url}/student/${studentId}`,{ method: 'DELETE' })
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
    if (record.studentId) {
      ref.setFieldsValue({
        ...record,
        academyId: record.academy.academyId,
        classsId: record.classs.classsId
      });
    } else {
      ref.setFieldsValue(record)
    }
    this.setState({ current: record, visible: true });
  };

  handleOk = async value => {
    await this.postStudentData(value)
    await this.getStudentData()
  };

  onClickDelete = async id => {
    await this.deleteStudentData(id)
    await this.getStudentData()
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
    this.getStudentData()
  };

  render() {
    const { data, currentPage, total, loading, academyArr, classArr } = this.state;
    const columns = [
      { title: '学生学号', dataIndex: 'studentNum', key: 'studentNum' },
      { title: '学生姓名', dataIndex: 'truename', key: 'truename' },
      { title: '学生所属学院', dataIndex: 'academy.name', key: 'academy' },
      { title: '学生班级', dataIndex: 'classs.name', key: 'className' },
      {
        title: '操作',
        key: 'operation',
        render: (text, record, index) => (
          <span>
            <a onClick={this.openModal.bind(this, record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除此学生？"
              onConfirm={this.onClickDelete.bind(this, record.studentId)}
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
          this.getStudentData()
        });
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.header}>
            <Row style={{ marginBottom: '16px' }} gutter={24}>
              <Col span={4}>
                <Button type="primary" disabled={loading} onClick={this.openModal.bind(this, {})}>
                  添加学生
                </Button>
              </Col>
              <Col span={4}>
                <Upload disabled={loading}>
                  <Button disabled={loading}>
                    <Icon type="upload" /> 批量导入
                  </Button>
                </Upload>
              </Col>
              <Col span={6}>
                <Input allowClear onChange={this.handleChangeSearch.bind(this, 'truename')} disabled={loading} placeholder="输入姓名进行查询" />
              </Col>
              <Col span={8} offset={2}>
                <Input allowClear onChange={this.handleChangeSearch.bind(this, 'studentNum')} disabled={loading} placeholder="请输入学号进行查询"/>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4}>
                <Button disabled={loading} type="primary" onClick={this.handleSearch}>搜索</Button>
              </Col>
              <Col span={10}>
                <Input allowClear onChange={this.handleChangeSearch.bind(this, 'classsName')} disabled={loading} placeholder="请输入学生班级进行查询"/>
              </Col>
              <Col span={8} offset={2}>
                <Select allowClear onChange={this.handleChangeSearch.bind(this, 'academyId')} style={{ width: '100%' }} disabled={loading} placeholder="选择学院">
                  {academyArr.map((item, index) => {
                    return (
                      <Option key={item.academyId} value={item.academyId}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
          </div>
          <Table loading={loading} rowKey={record => record.studentId} dataSource={data} columns={columns} pagination={pagination}/>
        </Card>
        <EditStudent
          ref={this.modalForm}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          current={this.state.current}
          academyArr={this.state.academyArr}
          classArr={this.state.classArr}
        />
      </PageHeaderWrapper>
    );
  }
}

export default StudentManage;
