import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type VmsForm = z.infer<typeof VmsFormScheme>;

export const VmsFormScheme = z.object({
  vmsFormId: z.string(), // VMS폼ID VARCHAR2(10 BYTE)
  vmsModlKind: z.string(), // VMS모듈종류 VARCHAR2(10 BYTE)
  vmsFormType: z.string(), //	VMS폼유형 VARCHAR2(3 BYTE)
  vmsFormNm: z.string(), // VMS폼명 VARCHAR2(64 BYTE)
  dsplEff: z.string(), //	표출효과 VARCHAR2(3 BYTE)
  dsplHr: z.number(), // 표출시간 NUMBER(3,0)
  backClr: z.string(), // 배경색상 VARCHAR2(3 BYTE)
  vmsFormImg: z.string(), // VMS폼이미지 BLOB
  rgstrId: z.string(), // 등록자 ID VARCHAR2(10 BYTE)
  regDt: z.string(), // 등록일시 DATE
  chngrId: z.string(), // 변경자 ID VARCHAR2(10 BYTE)
  chgDt: z.string(), // 변경일시 DATE
  objects: z.array(z.any()), // Objects의 ID를 담은 배열
});

export const GetVmsFormSchema = z.object({
  params: z.object({ formId: commonValidations.formId }),
});
