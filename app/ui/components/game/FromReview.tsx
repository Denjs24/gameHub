'use client'
import { Form, Rate, ConfigProvider, Input, Button } from "antd";


export function FormReview() {
  const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  //   console.log('Форма отправлена:', values);
  // };

  return (
    <Form
      form={form}
      // onFinish={onFinish}
      className="flex flex-col"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Введите имя' }]}
        layout="vertical"
      >
        <Input
          className="h-12"
          placeholder="Your name"
        />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[{ required: true, message: 'Введите сообщение' }]}
        layout="vertical"
      >
        <Input.TextArea
          placeholder="Write your review..."
          rows={4}
        />
      </Form.Item>

      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: 'Оцените' }]}
        layout="vertical"
      >
        <ConfigProvider
          theme={{
            components: {
              Rate: {
                starBg: '#ccc',
              },
            },
          }}
        >
          <Rate />
        </ConfigProvider>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="h-12"
        >
          Send
        </Button>
      </Form.Item>
    </Form>
  );
}
