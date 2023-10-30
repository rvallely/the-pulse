import Dotenv from 'dotenv-webpack';

const plugins = [
  new Dotenv({
    systemvars: true,
  }),
];

export default plugins;
