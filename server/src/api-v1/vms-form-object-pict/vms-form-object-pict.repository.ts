import { VmsFormObject } from '@/api-v1/vms-form-object/vms-form-object.model';
import { vmsFormImageObjectDB } from '@/db';
import { logger } from '@/server';

export const vmsFormPictObjectRepository = {
  findAllByVmsFormIdAsync: async (vmsFormId: string): Promise<VmsFormObject[]> => {
    logger.info(`VMS-FORM-PICT-OBJECT DB를 조회하였습니다. vmsFormId : ${vmsFormId}`);
    return vmsFormImageObjectDB?.filter((formObject) => formObject.vmsFormId === vmsFormId);
  },
  findByIdAsync: async (vmsFormId: string): Promise<VmsFormObject[]> => {
    logger.info(`VMS-FORM-PICT-OBJECT DB를 조회하였습니다. vmsFormId : ${vmsFormId}`);
    return vmsFormImageObjectDB?.filter((formObject) => formObject.vmsFormId === vmsFormId);
  },
};

/**
 * vmsFormId | VMS폼ID | VARCHAR2(10 BYTE)
 * @example form-1
 * sn | 순번 | NUMBER(5,0)
 * @example 1
 *
 * vmsFormObjKind |	VMS폼객체종류 |	VARCHAR2(3 BYTE)
 * @example pict
 *
 * vmsFormObjId |	VMS폼객체ID |	VARCHAR2(10 BYTE)
 * @example 'c130106b-5034-589b-e205-c04b07f510b2'
 *
 * backClr |	배경색상 | VARCHAR2(3 BYTE)
 * @example '#000'
 *
 * formObjPstnX |	폼객체위치X	| NUMBER(4,0)
 * @example 200
 *
 * formObjPstnY |	폼객체위치Y |	NUMBER(4,0)
 * @example 300
 *
 * formObjDsplWdth | 폼객체표출넓이 |	NUMBER(4,0)
 * @example 400
 *
 * formObjDsplHght |	폼객체표출높이 | NUMBER(4,0)
 * @example 400
 *
 * formObjBlnkYn |	폼객체점멸여부 | CHAR(1 BYTE)
 * @example 'Y'
 *
 *
 * style - pict 객체의 스타일
 * - vmsPictItemId	| VMS폼객체ID	| VARCHAR2(10 BYTE)
 * @example "SG-0000013"
 *
 * - pcitNm | 그림명 |	VARCHAR2(32 BYTE)
 * @example "[LCS] 감"
 *
 * - pictWdth | 그림넓이 |	NUMBER(4,0)
 * @example 32
 *
 * - pictHght | 그림높이 |	NUMBER(4,0)
 * @example 32
 *
 * - pictDataSz | 그림데이터크기 | NUMBER(7,0)
 * @example 3126
 *
 * - pictData | 그림데이터 | BLOB
 * @example "(BLOB)"
 *
 * - pictType | 그림유형 (B / bmp) | VARCHAR2(3 BYTE)
 * @example 'B'
 *
 * - rgstrId | 등록자 ID |	VARCHAR2(10 BYTE)
 * @example "superadmin"
 *
 * - rgDt | 등록일시 | DATE
 * @example "23/10/23"
 *
 * - chngrId | 변경자 ID |	VARCHAR2(10 BYTE)
 * @example null
 *
 * - chgDt | 변경일시 | DATE
 * @example null
 */
