import { VmsFormObject } from '@/api/vms-form-object/vms-form-object.model';
import { vmsFormObjectDB } from '@/db';
import { logger } from '@/server';

//     vmsFormId: 'form-1', //	VMS폼ID	VARCHAR2(10 BYTE)
//     sn: 1, //	순번	NUMBER(5,0)
//     vmsFormObjKind: 'txt', //	VMS폼객체종류	VARCHAR2(3 BYTE)
//     vmsFormObjId: 'c130106b-5034-589b-e205-c04b07f510b2', //	VMS폼객체ID	VARCHAR2(10 BYTE)
//     backClr: '#000', //	배경색상	VARCHAR2(3 BYTE)
//     formObjPstnX: 200, //	폼객체위치X	NUMBER(4,0)
//     formObjPstnY: 300, //	폼객체위치Y	NUMBER(4,0)
//     formObjDsplWdth: 400, //	폼객체표출넓이	NUMBER(4,0)
//     formObjDsplHght: 400, //	폼객체표출높이	NUMBER(4,0)
//     formObjBlnkYn: 'Y', //	폼객체점멸여부	CHAR(1 BYTE)
//     style: {
//       txtAlgnMthd: 'center', //	문자배열방법	VARCHAR2(3 BYTE)
//       fontClr: '#fff', //	글꼴색상	VARCHAR2(3 BYTE)
//       fontType: 'Arial', //	글꼴종류	VARCHAR2(3 BYTE)
//       fontSz: 20, //	글꼴크기	NUMBER(3,0)
//       fontThck: 'B', //	글꼴굵기	VARCHAR2(3 BYTE)
//       vmsTextItemId: 'c130106b-5034-589b-e205-c04b07f510b2-1', //	VMS문자항목ID	VARCHAR2(10 BYTE)
//       dsplTxt: '테스트 메시지', // 표출문자	VARCHAR2(256 BYTE)
//     },

export const vmsFormObjectRepository = {
  findByIdAsync: async (vmsFormId: string): Promise<VmsFormObject[]> => {
    logger.info(`VMS-FORM-OBJECT가 조회되었습니다. vmsFormId : ${vmsFormId}`);
    return vmsFormObjectDB?.filter((formObject) => formObject.vmsFormId === vmsFormId);
  },
};
