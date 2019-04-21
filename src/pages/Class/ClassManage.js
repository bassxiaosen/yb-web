import React from "react"
import {Table, Modal, message, Button, Input, Select, Row, Col, Card, Upload, Icon, Divider, Popconfirm} from "antd"
import styles from './styles.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditClass from './EditClass';

const Option = Select.Option;

class ClassManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [{
        className: '15医工计算机4',
      }, {
        className: '15医工医工4'
      }],
      current: {},
      currentPage: 1,
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
    const columns = [
      { title: '班级名称', dataIndex: 'className', key: 'className' },
      { title: '班级课程', key: 'classCourses', render: () => ( <a>查看课程</a> ) },
      { title: '班级学生', key: 'classStudents', render: () => ( <a>查看学生</a> ) },
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
      total: 100,
      onChange: page => {
        this.setState({ currentPage: page });
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.header}>
            <Row style={{ marginBottom: '16px' }} gutter={24}>
              <Col span={6}>
                <Button type="primary" onClick={this.openModal.bind(this, {})}>
                  添加班级
                </Button>
              </Col>
              <Col span={6}>
                <Upload>
                  <Button>
                    <Icon type="upload" /> 批量导入
                  </Button>
                </Upload>
              </Col>
              <Col span={6}>
                <Input enterButton placeholder="输入班级名称查询" />
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={this.handleSearch}>
                  搜索
                </Button>
              </Col>
            </Row>
          </div>
          <Table rowKey={record => record.studentId} dataSource={data} columns={columns} pagination={pagination}/>
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

