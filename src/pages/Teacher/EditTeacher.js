import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class EditTeacher extends React.Component {
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
      academyArr
    } = this.props;

    return (
      <Modal
        title={`${this.props.current.name ? '修改' : '添加'}教师`}
        visible={visible}
        onCancel={handleCancel}
        onOk={this.handleOk}
        afterClose={() => resetFields()}
      >
        <Form>
          <FormItem label="教师工号">
            {getFieldDecorator('teacherNum', { rules: [{ required: true, message: '请输入工号' }] })(<Input />)}
          </FormItem>
          <FormItem label="教师姓名">
            {getFieldDecorator('truename', { rules: [{ required: true, message: '请输入姓名' }] })(<Input />)}
          </FormItem>
          <FormItem label="教师学院">
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
          <FormItem label="教师密码">
            {getFieldDecorator('password'
            // , { rules: [{ required: true, message: '请输入密码' }] }
            )(
              <Input type="password" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default EditTeacher;
