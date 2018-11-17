import { applyMiddleware } from 'redux';
import logger from './logger';
import validator from './validator';

export default applyMiddleware(validator, logger);
