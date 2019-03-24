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

const Search = Input.Search;
const Option = Select.Option;

class StudentManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [
        {
          name: '蔡宇森',
          studentId: '2015081004',
          academy: '医学信息工程学院',
          entryYear: '2015',
          speciality: '计算机科学与技术',
        },
      ],
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
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '学院', dataIndex: 'academy', key: 'academy' },
      { title: '专业', dataIndex: 'speciality', key: 'speciality' },
      { title: '学号', dataIndex: 'studentId', key: 'studentId' },
      { title: '入学年份', dataIndex: 'entryYear', key: 'entryYear' },
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
              <Col span={4}>
                <Button type="primary" onClick={this.openModal.bind(this, {})}>
                  添加学生
                </Button>
              </Col>
              <Col span={4}>
                <Upload>
                  <Button>
                    <Icon type="upload" /> 导入学生
                  </Button>
                </Upload>
              </Col>
              <Col span={6}>
                <Input enterButton placeholder="输入姓名进行查询" />
              </Col>
              <Col span={8} offset={2}>
                <Input placeholder="请输入学号进行查询"/>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4}>
                <Button type="primary" onClick={this.handleSearch}>搜索</Button>
              </Col>
              <Col span={10}>
                <Input placeholder="请输入专业名称进行查询"/>
              </Col>
              <Col span={8} offset={2}>
                <Select style={{ width: '100%' }} placeholder="选择学院">
                  <Option value="1">医学信息工程学院</Option>
                </Select>
              </Col>
            </Row>
          </div>
          <Table rowKey={record => record.studentId} dataSource={data} columns={columns} pagination={pagination}/>
        </Card>
        <EditStudent
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

export default StudentManage;
