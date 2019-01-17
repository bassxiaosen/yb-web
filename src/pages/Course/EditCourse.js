import React from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class EditCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOk = () => {
    const { validateFields, resetFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const rangeValue = values['time'];
        const value = {
          ...values,
          time: [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        this.props.handleOk(value);
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
        title={`${this.props.current.name ? '修改' : '添加'}课程`}
        visible={visible}
        onCancel={handleCancel}
        onOk={this.handleOk}
        afterClose={() => resetFields()}
      >
        <Form>
          <FormItem label="课程名称">
            {getFieldDecorator('courseName', { rules: [{ required: true }] })(<Input />)}
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
          <FormItem label="任课时间">
            {getFieldDecorator('time', { rules: [{ required: true }] })(
              <RangePicker style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem label="任课教师">
            {getFieldDecorator('teacher', { rules: [{ required: true }] })(
              <Select mode="multiple">
                <Option key="001">某教师（医学信息工程学院）</Option>
                <Option key="002">某某教师（某某学院）</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default EditCourse;
