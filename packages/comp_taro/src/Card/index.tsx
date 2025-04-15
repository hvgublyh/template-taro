import React from 'react';
import { AtCard } from 'taro-ui';

export interface CardProps {
  title: string;
  description: string;
  icon?: string;
  onClick?: () => void;
}
const defaultIcon = 'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG';
const Card: React.FC<CardProps> = ({ title, description, icon, onClick }) => {
  return (
    <AtCard
      note='小Tips'
      extra='额外信息'
      title={title}
      thumb={icon || defaultIcon}
    >
      {description}
    </AtCard>
  );
};

export default Card;
