import { Button, Input, Space } from 'antd';
import { ChangeEventHandler, useState } from 'react'

const MainInput: React.FC = () => {
  const [value, setValue] = useState('');

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  }

  const handleClick = () => {
    console.log(value)
  }

  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input value={value} onChange={handleOnChange} placeholder="Enter repo URL" />
      <Button onClick={handleClick} type="primary">Load Issue</Button>
    </Space.Compact>
  )
}

export { MainInput };