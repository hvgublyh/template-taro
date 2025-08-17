import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: ['**/__tests__', '**/*.test.tsx', '**/*.stories.tsx']
      }
    })
  ],
  // 关键：将所有 Taro 相关的包设为 external
  external: [
    'react', 
    'react-dom', 
    'antd',
    '@tarojs/components',
    '@tarojs/taro',
    '@tarojs/runtime',
    '@tarojs/shared',
    // 使用正则表达式匹配所有 @tarojs 开头的包
    /^@tarojs\//
  ]
};