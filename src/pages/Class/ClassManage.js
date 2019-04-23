import React from "react"
import {Table, Modal, message, Button, Input, Select, Row, Col, Card, Upload, Icon, Divider, Popconfirm} from "antd"
import styles from './styles.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditClass from './EditClass';
import qs from 'qs'
import request from "@/utils/request"
import url from "@/utils/url"

const Option = Select.Option;

class ClassManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
      data: [],
      current: {},
      currentPage: 1,
      total: 0,
      // 查询数据
      name: '', // 班级名用于查询
      sortByName: 0,
    };
    this.modalForm = React.createRef();
  }

  async componentDidMount() {
    await this.getClassData()
  }

  getClassData = () => {
    const { name, currentPage, sortByName } = this.state
    return request(`${url}/class/search/${currentPage}/10`, {
      method: 'POST',
      body: {
        name, sortByName
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

  postClassData = (obj) => {
    this.setState({
      loading: true
    })
    return request(`${url}/class`, {
      method: 'POST',
      body: obj
    }).then((data) => {
      if (this.state.current.classId) {
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

  deleteClassData = (classId) => {
    this.setState({
      loading: true
    })
    return request(`${url}/class/${classId}`,{ method: 'DELETE' })
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
    ref.setFieldsValue(record);
    this.setState({ current: record, visible: true });
  };

  handleOk = async value => {
    await this.postClassData(value)
    await this.getClassData()
  };

  onClickDelete = async id => {
    console.log(id)
    await this.deleteClassData(id)
    await this.getClassData()
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
    this.getClassData()
    console.log('搜索');
  };

  render() {
    const { data, currentPage, total, loading } = this.state;
    const columns = [
      { title: '班级名称', dataIndex: 'name', key: 'name' },
      // { title: '班级课程', key: 'classCourses', render: () => ( <a>查看课程</a> ) },
      // { title: '班级学生', key: 'classStudents', render: () => ( <a>查看学生</a> ) },
      {
        title: '操作',
        key: 'operation',
        render: (text, record, index) => (
          <span>
            <a onClick={this.openModal.bind(this, record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除此课程？"
              onConfirm={this.onClickDelete.bind(this, record.classId)}
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
          this.getClassData()
        });
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.header}>
            <Row style={{ marginBottom: '16px' }} gutter={24}>
              <Col span={6}>
                <Button disabled={loading} type="primary" onClick={this.openModal.bind(this, {})}>
                  添加班级
                </Button>
              </Col>
              <Col span={6}>
                <Upload disabled={loading}>
                  <Button disabled={loading}>
                    <Icon type="upload" /> 批量导入
                  </Button>
                </Upload>
              </Col>
              <Col span={6}>
                <Input disabled={loading} onChange={this.handleChangeSearch.bind(this, 'name')} allowClear placeholder="输入班级名称查询" />
              </Col>
              <Col span={6}>
                <Button disabled={loading} type="primary" onClick={this.handleSearch}>
                  搜索
                </Button>
              </Col>
            </Row>
          </div>
          <Table loading={loading} rowKey={record => record.classId} dataSource={data} columns={columns} pagination={pagination}/>
        </Card>
        <EditClass
          ref={this.modalForm}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          current={this.state.current}
        />
      </PageHeaderWrapper>
    );
  }
}

export default ClassManage;

