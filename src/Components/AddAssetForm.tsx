import { useState } from 'react';
import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';
import { Button, DatePicker, Divider, Flex, Form, InputNumber, Select, Space, Typography } from 'antd';
import { useCrypto } from '../context/crypto-context.tsx';

const validateMessages = {
  required: '${label} is required',
  types: {
    number: '${label} is not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default function AddAssetForm() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState<CryptoResult | undefined>(undefined);
  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={(val) => setCoin(crypto.find((c) => c.id === val))}
        placeholder="Select coin"
        value="press / to open"
        //{options} - data set that goes into select
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            {/*{option.data = label, value, icon}*/}
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
    );
  }

  type FieldType = {
    amount: number;
    price: number;
    total: number;
    date: Date;
  };

  function onFinish(values) {
    console.log('values', values);
  }

  console.log('+coin.price.toFixed(2)', parseFloat(coin.price.toFixed(2)));

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
        {/*Typography - basic text writing, including headings, body text, lists, and more. Typography.Title = <h2> analogy*/}
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </Flex>
      {/*Divider - straight horizontal line*/}
      <Divider />
      <Form.Item<FieldType> label="Amount" name="amount" rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber disabled style={{ width: '100%' }} step={0.01} />
      </Form.Item>

      <Form.Item<FieldType> label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
