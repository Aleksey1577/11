'use client';

import { Card, Typography, Tag } from 'antd';

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export default function NewsCard({ post }: { post: Post }) {
  return (
    <Card
      className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mb-4 p-4 rounded-lg shadow-md bg-white transition-shadow hover:shadow-lg"
      style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)' }}
    >
      <Typography.Title level={5} className="text-lg font-semibold mb-2 text-gray-800">
        {post.title}
      </Typography.Title>
      <Typography.Paragraph
        ellipsis={{ rows: 3 }}
        className="text-sm text-gray-600 mb-3"
      >
        {post.body}
      </Typography.Paragraph>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <Tag color="blue" key={tag} className="text-xs">
            {tag}
          </Tag>
        ))}
      </div>
      <div className="text-sm font-medium text-gray-700">
        👍 {post.reactions.likes ?? 0} | 👎 {post.reactions.dislikes ?? 0}
      </div>
    </Card>
  );
}