import { Button, Input, Space, Form, message } from 'antd';
import { useSelector } from 'react-redux';

import { parseGithubUrl } from '../helpers/helpers';
import { fetchIssues } from '../redux/actions';
import { RootState, useAppDispatch } from '../redux/store';

type Properties = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const MainInput: React.FC<Properties> = ({ setValue }) => {
  const dispatch = useAppDispatch();
  const { items } = useSelector((state: RootState) => state.issues);
  const [form] = Form.useForm();

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const handleClick = () => {
    const itemsIds = items.map((item) => item.id);
    const { repoName, projectName } = parseGithubUrl(form.getFieldsValue().url);

    if (!itemsIds.includes(`${repoName}/${projectName}`)) {
      dispatch(fetchIssues(parseGithubUrl(form.getFieldsValue().url)));
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
              pattern: /^https:\/\/github.com\/([\w-]+)\/([\w-]+)\.*/,
              message: 'Invalid GitHub URL',
            },
          ]}
          style={{ width: '100%', marginBottom: 0 }}>
          <Input placeholder="Enter repo URL" />
        </Form.Item>
        <Form.Item>
          <Button disabled={!form.getFieldError('url')} htmlType="submit" type="primary">
            Load Issue
          </Button>
        </Form.Item>
      </Space.Compact>
    </Form>
  );
};

export { MainInput };
