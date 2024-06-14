import { VmsForm } from '@/api/vms-form/vms-form.model';
import { VmsFormObject } from '@/api/vms-form-object/vms-form-object.model';

/* eslint-disable @typescript-eslint/no-var-requires */
const vmsFormObjectDB: VmsFormObject[] = require('./vms-form-object.json');
const vmsFormDB: VmsForm[] = require('./vms-form.json');

export { vmsFormDB, vmsFormObjectDB };
