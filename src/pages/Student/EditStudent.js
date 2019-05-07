import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOk = () => {
    const { validateFields, resetFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        this.props.handleOk(values);
        this.props.handleCancel();
      }
    });
  };

  render() {
    const {
      visible,
      handleCancel,
      form: { getFieldDecorator, resetFields },
      academyArr,
      classArr
    } = this.props;
    const academy = [
      { id: '1', name: '医学信息工程学院', value: '医工' },
      { id: '2', name: '中医药学院', value: '中医药' },
    ];

    return (
      <Modal
        title={`${this.props.current.name ? '修改' : '添加'}学生`}
        visible={visible}
        onCancel={handleCancel}
        onOk={this.handleOk}
        afterClose={() => resetFields()}
      >
        <Form>
          <FormItem label="学生学号">
            {getFieldDecorator('studentNum', { rules: [{ required: true, message: '请输入学号' }] })(<Input />)}
          </FormItem>
          <FormItem label="学生姓名">
            {getFieldDecorator('truename', { rules: [{ required: true, message: '请输入姓名' }] })(<Input />)}
          </FormItem>
          <FormItem label="学院">
            {getFieldDecorator('academyId', { rules: [{ required: true, message: '请选择学院' }] })(
              <Select
                showSearch
                optionFilterProp="children"
              >
                {academyArr.map((item, index) => {
                  return (
                    <Option key={item.academyId} value={item.academyId}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="班级">
            {getFieldDecorator('classsId', { rules: [{ required: true, message: '请选择班级' }] })(
              <Select
                showSearch
                optionFilterProp="children"
              >
                {classArr.map((item, index) => {
                  return (
                    <Option key={item.classsId} value={item.classsId}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="学生密码">
            {getFieldDecorator('password'
              // , { rules: [{ required: true, message: '请输入密码' }] }
            )(<Input type="password" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default EditStudent;
