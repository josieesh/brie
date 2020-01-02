import { cli } from '../cli';
test('cli', () => {
  expect(cli('Josie')).toStrictEqual('Josie');
});