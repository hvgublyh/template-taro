import React from 'react';
import { Text, View } from '@tarojs/components';

export interface CardProps {
  title: string;
  description: string;
  icon?: string;
  onClick?: () => void;
}
const Card: React.FC<CardProps> = ({ title, description, icon, onClick }) => {
  return (
    <View className="card" onClick={onClick}>
      <View className="card-header">
        {icon}
        <Text>{title}</Text>
      </View>
      <View className="card-body">
        <Text>{description}</Text>
      </View>
    </View>
  );
};

export default Card;
