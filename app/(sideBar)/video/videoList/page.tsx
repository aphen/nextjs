'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Popconfirm, Table, Typography, Tag, Button } from 'antd';
import { getVideoList, deleteVideo, editVideo } from '@/app/api';
import VideoAdd from '../videoAdd';

interface Item {
  id: string;
  name: string;
  age: number;
  address: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <Input /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);
  const [editingKey, setEditingKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getVideoListData = () => {
    getVideoList().then((response) => {
      setData(response.data);
    });
  }
  useEffect(()=> {
    getVideoListData();
  }, [])

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    getVideoListData();
  }
  // 取消编辑
  const cancel = () => {
    setEditingKey('')
  };
  // 弹出框取消
  const onCancel = () => {
    setIsModalOpen(false);
  };
  const addRow = (): void => {
    setIsModalOpen(true);
  };
  const save = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      editVideo(newData[index].id, row).then(() => {

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      })
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        editable: true
        //render: (text: String) => <i>{text}</i>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        editable: true
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        editable: true
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags = []): JSX.Element => (
            <>
                {tags.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
        <Button onClick={addRow}>添加一行</Button>
        <Form form={form} component={false}>
          <Table
              components={{
              body: {
                  cell: EditableCell,
              },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: onCancel,
              }}
              rowKey="_id"
          />
        </Form>
        {isModalOpen ?
          <VideoAdd handleOk={handleOk} onCancel={onCancel} isModalOpen={isModalOpen}></VideoAdd>
          : ''
        }
    </>
  );
};

export default App;