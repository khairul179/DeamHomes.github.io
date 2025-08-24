import React from 'react';

export default function ContactInfoItem({ icon: Icon, title, content, link }) {
  const Wrapper = link ? 'a' : 'div';
  const wrapperProps = link
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`flex items-start ${
        link ? 'hover:text-blue-600 transition-colors' : ''
      }`}
    >
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 break-all">{content}</p>
      </div>
    </Wrapper>
  );
}
