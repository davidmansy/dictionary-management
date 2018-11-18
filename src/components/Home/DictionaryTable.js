import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteDictionary, updateDictionary } from '../../actions/dictionaries';
import { withRouter } from 'react-router-dom';
import { Table, Input, Popconfirm, Form, Divider } from 'antd';

/*
  Display table from ant.design
  https://ant.design/components/table/#components-table-demo-edit-cell
*/

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false
  };

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  handleClickOutside = e => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  };

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

class DictionaryTable extends Component {
  constructor(props) {
    super(props);
    const { dictionaries } = this.props;
    this.columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        width: '80%',
        editable: true
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => {
          return dictionaries.length >= 1 ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => this.goToDetails(record.key)}
              >
                Details
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            </span>
          ) : null;
        }
      }
    ];
  }

  goToDetails = key => {
    const { history } = this.props;
    history.push(`/dictionaries/${key}`);
  };

  handleDelete = key => {
    const { dispatch } = this.props;
    dispatch(deleteDictionary(key));
  };

  handleSave = row => {
    const { dispatch } = this.props;
    console.log('row', row);
    dispatch(updateDictionary(row.key, row.title));
  };

  render() {
    const { dictionaries } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dictionaries}
          columns={columns}
        />
      </div>
    );
  }
}

function mapStateToProps({ dictionaries }) {
  return {
    dictionaries
  };
}

export default withRouter(connect(mapStateToProps)(DictionaryTable));
