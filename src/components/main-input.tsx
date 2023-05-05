import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Space, Form, message } from 'antd';

import { fetchIssues } from '../redux/actions';
import { parseGithubUrl } from '../helpers/helpers';
import { type RootState, useAppDispatch } from '../redux/store';

interface Properties {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const MainInput: React.FC<Properties> = ({ setValue }) => {
  const dispatch = useAppDispatch();
  const { items } = useSelector((state: RootState) => state.issues);
  const [form] = Form.useForm();

  const inputRegex = /^https:\/\/github.com\/([\w-]+)\/([\w-]+)\.*/;

  const onFinishFailed = (): void => {
    void message.error('Submit failed!');
  };

  const handleClick = (): void => {
    const itemsIds = items.map((item) => item.id);
    const { repoName, projectName } = parseGithubUrl(form.getFieldsValue().url);

    if (!itemsIds.includes(`${repoName}/${projectName}`)) {
      void dispatch(fetchIssues(parseGithubUrl(form.getFieldsValue().url)));
    }
    setValue(form.getFieldsValue().url);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleClick} onFinishFailed={onFinishFailed}>
      <Space.Compact style={{ width: '100%' }}>
        <Form.Item
          name="url"
          rules={[
            { required: true },
            {
              pattern: inputRegex,
              message: 'Invalid GitHub URL',
            },
          ]}
          style={{ width: '100%', marginBottom: 0 }}>
          <Input placeholder="Enter repo URL" type="text" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
              htmlType="submit"
              type="primary"
            >
              Load Issue
            </Button>
          )}
        </Form.Item>
      </Space.Compact>
    </Form>
  );
};

export { MainInput };
