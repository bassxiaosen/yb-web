import React from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class EditCourseDetail extends React.Component {
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
          <FormItem label="姓名">
            {getFieldDecorator('name', { rules: [{ required: true }] })(<Input />)}
          </FormItem>
          <FormItem label="学号">
            {getFieldDecorator('number', { rules: [{ required: true }] })(<Input />)}
          </FormItem>
          <FormItem label="学院">
            {getFieldDecorator('academy', { rules: [{ required: true }] })(
              <Select>
                {academy.map((item, index) => {
                  return (
                    <Option key={index} value={item.value}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="专业">
            {getFieldDecorator('subject', { rules: [{ required: true }] })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default EditCourseDetail;
