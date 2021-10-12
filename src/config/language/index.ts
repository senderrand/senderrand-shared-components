import { en } from './en';
import { ar } from './ar';

interface Lang {
  [key: string]: any;
}
const Languages: Lang = { en, ar };
export default Languages;
