import { VmsFormObject } from '@/api-v1/vms-form-object/vms-form-object.model';
import { vmsFormImageObjectDB, vmsFormTextObjectDB } from '@/db';
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

//	VMS_FORM_OBJ_ID	VMS폼객체ID	VARCHAR2(10 BYTE)
//	PICT_NM	그림명	VARCHAR2(32 BYTE)
//	PICT_WDTH	그림넓이	NUMBER(4,0)
//	PICT_HGHT	그림높이	NUMBER(4,0)
//	PICT_DATA_SZ	그림데이터크기	NUMBER(7,0)
//	PICT_DATA	그림데이터	BLOB
//	PICT_TYPE	그림유형 (B / bmp)	VARCHAR2(3 BYTE)
//	RGSTR_ID	등록자 ID	VARCHAR2(10 BYTE)
//	REG_DT	등록일시	DATE
//	CHNGR_ID	변경자 ID	VARCHAR2(10 BYTE)
//	CHG_DT	변경일시	DATE

export const vmsFormObjectRepository = {
  findByIdAsync: async (vmsFormId: string): Promise<VmsFormObject[]> => {
    logger.info(`VMS-FORM-OBJECT가 조회되었습니다. vmsFormId : ${vmsFormId}`);

    const textObjects = vmsFormTextObjectDB?.filter((formObject) => formObject.vmsFormId === vmsFormId);
    const imageObjects = vmsFormImageObjectDB?.filter((formObject) => formObject.vmsFormId === vmsFormId);
    // const videoObjects = vmsFormImageObjectDB?.filter((formObject) => formObject.vmsFormId === vmsFormId);

    return [...textObjects, ...imageObjects];
  },
};
