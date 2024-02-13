import { useRef, useState } from 'react';
import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Divider, Form, InputNumber, Result, Select, Space } from 'antd';
import { useCrypto } from '../context/crypto-context.tsx';
import CoinInfo from './CoinInfo.tsx';
import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';
import emptyCoin from '../emptyCoin/emptyCoin.ts';
import dayjs from 'dayjs';

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
  onClose?: () => void;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
  asset?: CryptoAsset;
};

export default function AddAssetForm({ onClose, asset, isEditing, setIsEditing }: AddAssetFromProps) {
  //[form] similar to ref here
  const [form] = Form.useForm();
  const { crypto, addAsset, editAssetContext } = useCrypto();
  const [coin, setCoin] = useState<CryptoResult>(emptyCoin);
  // submitted - check if form gets submitted, <Result/> show
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<string | string[]>('');
  const [initialAsset, setInitialAsset] = useState<CryptoAsset>(asset!);
  const assetRef = useRef<FieldType>();

  if (submitted && !isEditing) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current!.amount} of ${coin!.name} by price ${assetRef.current!.price.toFixed(2)}$`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Go Console
          </Button>,
        ]}
      />
    );
  }

  if (!isEditing && coin === emptyCoin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={(val) => setCoin(crypto.find((c) => c.id === val) ?? emptyCoin)}
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
    date: string | string[];
  };

  function onFinish(values: FieldType) {
    if (coin) {
      const newAsset = {
        name: isEditing ? initialAsset.name : coin.id,
        amount: values.amount,
        price: values.price,
        date: date ? date : initialAsset.date,
      };
      assetRef.current = newAsset;
      setSubmitted(true);
      if (isEditing && asset) {
        editAssetContext(newAsset, asset._id!);
        setDate('');
        setInitialAsset(asset);
        if (setIsEditing) {
          setIsEditing(!isEditing);
        }
      } else {
        addAsset(newAsset);
      }
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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 10 }}
      style={{
        maxWidth: 600,
      }}
      initialValues={
        isEditing
          ? {
              amount: initialAsset.amount,
              price: initialAsset.price,
              date: dayjs(initialAsset.date as string),
              total: +(initialAsset.amount * initialAsset.price).toFixed(2),
            }
          : {
              price: +coin.price.toFixed(2),
            }
      }
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      {/*Divider - straight horizontal line*/}
      <Divider />
      <Form.Item<FieldType> label="Amount" name="amount" rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price" rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} step={0.01} />
      </Form.Item>

      <Form.Item<FieldType> label="Date & Time" name="date" rules={[{ required: true }]}>
        <DatePicker onChange={onChangeTime} showTime />
      </Form.Item>

      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} step={0.01} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditing ? 'Save' : 'Add Asset'}
        </Button>
      </Form.Item>
    </Form>
  );
}
