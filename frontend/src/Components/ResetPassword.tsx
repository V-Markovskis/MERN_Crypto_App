import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.ts';
import { Button, Form, Input } from 'antd';

export function ResetPassword() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    // Get the access token and refresh token from the URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.hash.substring(1));
      setAccessToken(params.get('access_token') || '');
      setRefreshToken(params.get('refresh_token') || '');
    }
  }, []);

  useEffect(() => {
    // Authenticate the user using the access token and refresh token
    const getSessionWithTokens = async () => {
      if (accessToken && refreshToken) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (!accessToken) {
          console.log('no access token');
        }

        if (!refreshToken) {
          console.log('no refresh token');
        }

        if (error) {
          alert(`Error signing in: ${error.message}`);
        }
      }
    };

    // Call this function only when accessToken and refreshToken are available.
    if (accessToken && refreshToken) {
      getSessionWithTokens();
    }
  }, [accessToken, refreshToken]);

  const handlePasswordUpdate = async (newPassword: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('Error updating password', error);
        return;
      }

      if (data) {
        alert('Password has been updated successfully!');
      }
    } catch (error) {
      console.error('Error updating password', error);
    }
  };

  type FieldType = {
    email: string;
  };

  const onFinish = (passwordFromInput: FieldType) => {
    console.log('passwordFromInput:', passwordFromInput);
    handlePasswordUpdate(passwordFromInput.email);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
