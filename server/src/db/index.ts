import { VmsForm } from '@/api-v1/vms-form/vms-form.model';
import { VmsFormObject } from '@/api-v1/vms-form-object/vms-form-object.model';

/* eslint-disable @typescript-eslint/no-var-requires */
const vmsFormDB: VmsForm[] = require('./vms-form.json');

const vmsFormTextObjectDB: VmsFormObject[] = require('./vms-form-object-text.json'); // 텍스트 객체
const vmsFormImageObjectDB: VmsFormObject[] = require('./vms-form-object-picture.json'); // 이미지 객체
const vmsFormVideoObjectDB: VmsFormObject[] = require('./vms-form-object-video.json'); // 비디오 객체

export { vmsFormDB, vmsFormImageObjectDB, vmsFormTextObjectDB, vmsFormVideoObjectDB };
