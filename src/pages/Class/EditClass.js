import React from 'react';
import { Modal, Form, Input, Select, Upload, Button, Icon } from 'antd';
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
    } = this.props;
    const academy = [
      { id: '1', name: '医学信息工程学院', value: '医工' },
      { id: '2', name: '中医药学院', value: '中医药' },
    ];
    const props = {
      beforeUpload: (file) => {
        return false;
      }
    }

    return (
      <Modal
        title={`${this.props.current.className ? '修改' : '添加'}班级`}
        visible={visible}
        onCancel={handleCancel}
        onOk={this.handleOk}
        afterClose={() => resetFields()}
      >
        <Form>
          <FormItem label="班级名称">
            {getFieldDecorator('className', { rules: [{ required: true, message: '请输入班级名称' }] })(<Input />)}
          </FormItem>
          <FormItem label="班级所属学院">
            {getFieldDecorator('academy', { rules: [{ required: true, message: '请选择学院' }] })(
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
          {/* <FormItem label="导入学生信息">
            {
              getFieldDecorator('sutentInfo',
                { rules: [{ required: true, message: '请上传文件' }] }
              )(
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> 上传文件
                  </Button>
                </Upload>
              )
            }
          </FormItem> */}
        </Form>
      </Modal>
    );
  }
}

export default EditTeacher;
