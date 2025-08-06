import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import { getFeedback } from './js/product-api';
import { feedbackSection } from './js/feedback';

getFeedback();

feedbackSection();
