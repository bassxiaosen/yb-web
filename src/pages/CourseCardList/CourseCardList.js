import React, { Component } from 'react';
import { Card, Pagination, Row, Col, Input, Select, Button, message, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import qs from 'qs'
import request from "@/utils/request"
import url from "@/utils/url"

const Option = Select.Option
export default class CourseCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      total: 0,
      data: [],
      academyArr: [],
      coursesArr: [
        { id: 1, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2015上',teacher: '张三',
        academy: '医学信息工程学院' },
        {
          id: 2,
          name: 'C++程序设计',
          totalNum: '65',
          class: '15医工计算机',
          date: '2015下',
          teacher: '李四',
          academy: '医学信息工程学院'
        },
        {
          id: 3,
          name: 'Java程序设计',
          totalNum: '65',
          class: '15医工计算机',
          date: '2016上',
          teacher: '王五',
          academy: '医学信息工程学院'
        },
        { id: 4, name: 'C#程序设计', totalNum: '65', class: '15医工计算机', date: '2016下', teacher: '王五',
        academy: '医学信息工程学院' },
        { id: 5, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2015上', teacher: '王五',
        academy: '医学信息工程学院' },
        { id: 6, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2015上', teacher: '王五',
        academy: '医学信息工程学院' },
        { id: 7, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2015上', teacher: '王五',
        academy: '医学信息工程学院' },
      ],
      // 查询数据
      academyId: '', // 学院
      teacherTruename: '', // 教师名
      className: '', // 班级名称
      name: '', // 课程名称

      teacherId: '', // 教师id

      loading: true,
    };
  }

  async componentDidMount() {
    await this.getAcademyData()
    await this.getCourseData()
  }

  getCourseData = () => {
    this.setState({
      loading: true
    })
    const { currentPage, academyId, name, className, teacherTruename } = this.state
    return request(`${url}/course/search/${currentPage}/10`, {
      method: 'POST',
      body: {
        teacher: {
          teacherId: localStorage.getItem('userId'),
          teacherTruename
        },
        currentPage,
        academy: {
          academyId,
        },
        name,
        classs: {
          classsName: className,
        }
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
      message.error('获取课程失败')
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
      message.error('获取学院你失败')
      console.log(e)
    })
  }

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
    const { coursesArr, currentPage, total, academyArr, loading, data } = this.state;
    const { handleChangeSearch } = this
    const { match } = this.props;
    const cardStyle = { marginBottom: '24px' };
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total,
      onChange: page => {
        console.log(page)
        this.setState({ currentPage: page }, () => {
          this.getCourseData()
        });
      },
    };

    return (
      <PageHeaderWrapper>
        <div style={{ minHeight: '600px' }}>
        <div style={{ marginBottom: '24px' }}>
            <Row style={{ marginBottom: '16px' }} gutter={24}>
              <Col span={5}>
                <Input disabled={loading} allowClear onChange={handleChangeSearch.bind(this, 'name')} placeholder="输入课程名称查询" />
              </Col>
              <Col span={5}>
                <Input disabled={loading} allowClear onChange={handleChangeSearch.bind(this, 'className')} placeholder="输入课程班级查询" />
              </Col>
              <Col span={5}>
                <Input disabled={loading} allowClear onChange={handleChangeSearch.bind(this, 'teacherTruename')} placeholder="输入任教老师查询" />
              </Col>
              <Col span={5}>
                <Select disabled={loading} allowClear onChange={handleChangeSearch.bind(this, 'academyId')} style={{ width: '100%' }} placeholder="选择学院">
                  {academyArr.map((item, index) => {
                    return (
                      <Option key={item.academyId} value={item.academyId}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col span={4}>
                <Button disabled={loading} type="primary" onClick={this.handleSearch}>搜索</Button>
              </Col>
            </Row>
          </div>
          <Row gutter={24}>
            <Spin spinning={loading}>
              {data.map(item => (
                <Col key={item.courseId} span={6}>
                  <Card
                    onClick={() => {
                      router.push(`${match.path}/teacherCourseDetail/${item.courseId}`);
                    }}
                    style={cardStyle}
                    hoverable
                    title={item.name}
                  >
                    <p>班级：{item.classs.name}</p>
                    <p>上课人数：{item.studentCount}</p>
                    <p>上课时间：{item.giveDate}</p>
                    <p>任课教师：{item.teacher.truename}</p>
                    <p>所属学院：{item.academy.name}</p>
                  </Card>
                </Col>
              ))}
            </Spin>
          </Row>
          <Row style={{textAlign: 'right'}}>
            <Pagination
              {...pagination}
            />
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}
