import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type VmsFormObject = z.infer<typeof VmsFormObjectScheme>;

export const VmsFormObjectScheme = z.object({
  vmsFormId: z.string(), //	VMS폼ID	VARCHAR2(10 BYTE)
  sn: z.number(), //	순번	NUMBER(5,0)
  vmsFormObjKind: z.string(), //	VMS폼객체종류	VARCHAR2(3 BYTE)
  vmsFormObjId: z.string(), //	VMS폼객체ID	VARCHAR2(10 BYTE)
  backClr: z.string(), //	배경색상	VARCHAR2(3 BYTE)
  formObjPstnX: z.number(), //	폼객체위치X	NUMBER(4,0)
  formObjPstnY: z.number(), //	폼객체위치Y	NUMBER(4,0)
  formObjDsplWdth: z.number(), //	폼객체표출넓이	NUMBER(4,0)
  formObjDsplHght: z.number(), //	폼객체표출높이	NUMBER(4,0)
  formObjBlnkYn: z.string(), //	폼객체점멸여부	CHAR(1 BYTE)
  style: z.any(),
});

export const GetVmsFormObjectSchema = z.object({
  query: z.object({ formId: commonValidations.formId, objectId: commonValidations.objectId }),
});
