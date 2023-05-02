import { Button, Input, Space, Form, message } from 'antd';
import { parseGithubUrl } from '../helpers/helpers';
import { fetchIssues } from '../redux/actions';
import { useAppDispatch } from '../redux/store';

type Properties = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const MainInput: React.FC<Properties> = ({ setValue }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const handleClick = () => {
    dispatch(fetchIssues(parseGithubUrl(form.getFieldsValue().url)));
    setValue(form.getFieldsValue().url);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleClick} onFinishFailed={onFinishFailed} >
      <Space.Compact style={{ width: '100%' }}>
        <Form.Item
          name="url"
          rules={[
            { required: true },
            { pattern: /^https:\/\/github.com\/([\w-]+)\/([\w-]+)\.*/, message: 'Invalid GitHub URL' },
          ]}
          style={{ width: '100%', marginBottom: 0 }}
        >
          <Input placeholder="Enter repo URL" />
        </Form.Item>
        <Form.Item>
          <Button disabled={!form.getFieldError('url')} htmlType="submit" type="primary">Load Issue</Button>
        </Form.Item>
      </Space.Compact>
    </Form>
  )
}

export { MainInput };