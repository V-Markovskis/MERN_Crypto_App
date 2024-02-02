import { useRef, useState } from 'react';
import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Divider, Form, InputNumber, Result, Select, Space } from 'antd';
import { useCrypto } from '../context/crypto-context.tsx';
import CoinInfo from './CoinInfo.tsx';

const validateMessages = {
  required: '${label} is required',
  types: {
    number: '${label} is not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

type AddAssetFromProps = {
  onClose: () => void;
};

export default function AddAssetForm({ onClose }: AddAssetFromProps) {
  //[form] similar to ref here
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState<CryptoResult | undefined>(undefined);
  // submitted - check if form gets submitted, <Result/> show
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState('');
  const assetRef = useRef<FieldType>();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current!.amount} of ${coin!.name} by price ${assetRef.current!.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Go Console
          </Button>,
        ]}
      />
    );
  }

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
    total?: number;
    date: string;
  };

  function onFinish(values: FieldType) {
    if (coin) {
      const newAsset = {
        id: coin.id,
        amount: values.amount,
        price: values.price,
        date: date,
      };
      assetRef.current = newAsset;
      setSubmitted(true);
      addAsset(newAsset);
    }
  }

  function handleAmountChange(value: number | null) {
    const price = form.getFieldValue('price');
    if (value) {
      form.setFieldsValue({
        total: +(value * price).toFixed(2),
      });
    }
  }

  function handlePriceChange(value: number | null) {
    const amount = form.getFieldValue('amount');
    if (value) {
      form.setFieldsValue({
        total: +(amount * value).toFixed(2),
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onChangeTime: DatePickerProps['onChange'] = (date, dateString) => {
    return setDate(dateString);
  };

  return (
    <Form
      form={form}
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
      <CoinInfo coin={coin} />
      {/*Divider - straight horizontal line*/}
      <Divider />
      <Form.Item<FieldType> label="Amount" name="amount" rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} step={0.01} />
      </Form.Item>

      <Form.Item<FieldType> label="Date & Time" name="date">
        <DatePicker onChange={onChangeTime} showTime />
      </Form.Item>

      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} step={0.01} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
