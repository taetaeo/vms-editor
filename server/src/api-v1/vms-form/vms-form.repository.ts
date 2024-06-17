import { VmsForm } from '@/api-v1/vms-form/vms-form.model';
import { vmsFormDB } from '@/db';
import { logger } from '@/server';

// vmsFormId: 'form-1', // VMS폼ID VARCHAR2(10 BYTE)
// vmsModlKind: 'a', // VMS모듈종류 VARCHAR2(10 BYTE)
// vmsFormType: '테스트 a', //	VMS폼유형 VARCHAR2(3 BYTE)
// vmsFormNm: '폼 테스트 a', // VMS폼명 VARCHAR2(64 BYTE)
// dsplEff: '테스트 효과 a', //	표출효과 VARCHAR2(3 BYTE)
// dsplHr: 1000, // 표출시간 NUMBER(3,0)
// backClr: '#000', // 배경색상 VARCHAR2(3 BYTE)
// vmsFormImg: '테스트 blob', // VMS폼이미지 BLOB
// rgstrId: '오태권', // 등록자 ID VARCHAR2(10 BYTE)
// regDt: new Date('2024-06-13'), // 등록일시 DATE
// chngrId: '오태권', // 변경자 ID VARCHAR2(10 BYTE)
// chgDt: new Date('2024-06-13'), // 변경일시 DATE
// // Objects의 ID를 담은 배열
// objects: [
//   'c130106b-5034-589b-e205-c04b07f510b2',
//   'e255799e-9a35-5430-56f8-c59da62b1dc1',
//   '118600b6-a769-8852-211a-cc2cc455f4e7',

export const vmsFormRepository = {
  findByIdAsync: async (vmsFormId: string): Promise<VmsForm | null> => {
    logger.info(`VMS FORM DB가 조회되었습니다. vmsFormId : ${vmsFormId}`);
    return vmsFormDB?.find((form) => form.vmsFormId === vmsFormId) || null;
  },
};
