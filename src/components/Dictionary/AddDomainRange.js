import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDomainRange } from '../../actions/dictionaries';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddDomainRangeForm extends Component {
  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, dictionary } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch(
          addDomainRange({
            key: dictionary.key,
            domain: values.domain,
            range: values.range
          })
        );
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
    const domainError = isFieldTouched('domain') && getFieldError('domain');
    const rangeError = isFieldTouched('range') && getFieldError('range');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={domainError ? 'error' : ''}
          help={domainError || ''}
        >
          {getFieldDecorator('domain', {
            rules: [{ required: true, message: 'Please input a domain!' }]
          })(
            <Input
              prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Domain"
            />
          )}
        </FormItem>
        <FormItem
          validateStatus={rangeError ? 'error' : ''}
          help={rangeError || ''}
        >
          {getFieldDecorator('range', {
            rules: [{ required: true, message: 'Please input a range!' }]
          })(
            <Input
              prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Range"
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

function mapStateToProps({ dictionaries }, { id }) {
  const dictionary = dictionaries.find(d => d.key === id);
  return {
    dictionary
  };
}

export default connect(mapStateToProps)(Form.create()(AddDomainRangeForm));
