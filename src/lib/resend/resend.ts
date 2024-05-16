import { Resend } from 'resend';
import { evar } from '../envConstant';

export const resend = new Resend(evar.resendApiKey);