import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateDomainRange } from '../../actions/dictionaries';
import { Table, Input, InputNumber, Popconfirm, Form, Tag } from 'antd';

/*
  Display table from ant.design
  https://ant.design/components/table/#components-table-demo-edit-cell
  I mix the two tables 'Editable Cells' and 'Editable Rows' from the demo
  and use the redux store for the dataSource instead of the state
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
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class DomainsRangesTable extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props.dictionary;
    this.state = { editingKey: '' };
    this.columns = [
      {
        title: 'Domain',
        dataIndex: 'domain',
        width: '25%',
        editable: true
      },
      {
        title: 'Range',
        dataIndex: 'range',
        width: '25%',
        editable: true
      },
      {
        title: 'Issues',
        dataIndex: 'issues',
        width: '30%',
        editable: false,
        render: (text, record) => {
          return (
            <span>
              {record.issues.size === 0 ? null : (
                <Fragment>
                  {[...record.issues].map(issue => (
                    <Tag
                      color={issue.severity === 'warning' ? 'orange' : 'red'}
                      key={issue.type}
                    >
                      {issue.type}
                    </Tag>
                  ))}
                </Fragment>
              )}
            </span>
          );
        }
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <a
                    onClick={() => this.edit(record.key)}
                    className="edit-link"
                  >
                    Edit
                  </a>
                  {data.length >= 1 ? (
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => this.handleDelete(record.key)}
                    >
                      <a href="javascript:;">Delete</a>
                    </Popconfirm>
                  ) : null}
                </span>
              )}
            </div>
          );
        }
      }
    ];
  }

  handleDelete = key => {
    const { dispatch, dictionary } = this.props;
    const data = dictionary.data.filter(item => item.key !== key);
    dispatch(updateDomainRange(dictionary.key, data));
  };

  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    const { dispatch, dictionary } = this.props;
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...dictionary.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
      } else {
        newData.push(row);
      }
      this.setState({ editingKey: '' });
      dispatch(updateDomainRange(dictionary.key, newData));
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const { data } = this.props.dictionary;
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
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <div>
        <Table
          components={components}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
        />
      </div>
    );
  }
}

function mapStateToProps({ dictionaries }, { id }) {
  const dictionary = dictionaries.find(d => d.key === id);
  return {
    dictionary
  };
}

export default connect(mapStateToProps)(DomainsRangesTable);
