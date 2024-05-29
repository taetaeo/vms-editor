type UnknownObject<T> = T extends { objectId: string | number } ? T : never;

export default class UtilsModel {
  /**
   * 빈 배열 찾기
   * @param list
   * @returns {boolean}
   */
  public isEmptyArray(list: unknown[]) {
    if (!Array.isArray(list)) throw "배열의 형태가 아닙니다.";
    return list.length === 0;
  }

  /**
   * instance 찾기
   * @returns {boolean}
   */
  public whatInstance<T>(rawData: unknown, model: new (...args: any[]) => T): rawData is T {
    return rawData instanceof model;
  }

  /**
   * 특정 아이디 값 찾는 로직
   * @param {unknown} list - 알기를 원하는 배열
   * @param {string|number} targetId - 알고자하는 데이터의 아이디값
   * @returns {number} - 있을 경우 index 없을 경우 -1
   */
  public getUniqueElement(list: UnknownObject<any>[], targetId: string | number): number {
    if (!targetId) throw "객체 ID가 없습니다.";
    return list.findIndex((data) => data.objectId === targetId);
  }

  public getEventFromCanvas() {}

  /**
   * 값이 있는지 확인하는 함수
   * @param {unknown} target
   * @returns {boolean}
   */
  public isBeingChecker(target: unknown): boolean {
    if (target === undefined || target === null) {
      console.warn(`Value '${target}' is undefined or null.`);
      return false;
    }
    return true;
  }
}
