import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDictionary } from '../../actions/dictionaries';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddDictionaryForm extends Component {
  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch(addDictionary(values.title));
        this.props.form.resetFields();
        this.props.form.validateFields(); //disable submit
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={titleError ? 'error' : ''}
          help={titleError || ''}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input a title!' }]
          })(
            <Input
              prefix={
                <Icon type="database" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Title"
              style={{ width: 300 }}
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Add
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect()(Form.create()(AddDictionaryForm));
