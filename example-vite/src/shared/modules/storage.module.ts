export type LocalStorageKey = string;

/**
/**
 * 로컬 스토리지에서 특정 키에 저장된 데이터를 가져오는 함수
 * @param {string} key - 가져올 데이터의 키
 * @returns {StorageValue | null} - 가져온 데이터 또는 null
 */
function get(key: LocalStorageKey) {
  try {
    const rawData = localStorage.getItem(key);

    if (!rawData) {
      throw new Error(`로컬 스토리지에 저장된 키가 없습니다. - 키: ${key}`);
    }

    return parseJsonData(rawData);
  } catch (error) {
    console.error("로컬 스토리지에서 데이터를 가져오는데 에러가 발생했습니다.:", error);
    return null;
  }
}

/**
 * 로컬 스토리지에 데이터를 저장하는 함수
 * @param {string} key - 저장할 데이터의 키
 * @param value - 저장할 데이터의 값
 */
function set<K extends LocalStorageKey, T>(key: K, value: T) {
  try {
    assertKeyAndValue(key, value);
    localStorage.setItem(key, stringifyJsonData(value));
    console.log(`${key}에 해당하는 데이터를 갱신했습니다.`);
  } catch (error) {
    console.error("로컬 스토리지로 데이터를 보내는데 에러가 발생했습니다.:", error);
  }
}

/**
 * 로컬 스토리지에서 특정 키의 데이터를 삭제하는 함수
 * @param {string} key - 삭제할 데이터의 키
 */
function _delete(key: LocalStorageKey) {
  try {
    assertKey(key);
    localStorage.removeItem(key);
    console.log("데이터 삭제를 성공하였습니다.");
  } catch (error) {
    console.error("로컬 스토리지로부터 데이터를 삭제하는데 에러가 발생했습니다.:", error);
  }
}

/**
 * 주어진 키가 문자열이고 비어 있지 않음을 확인하는 함수
 * @param {LocalStorageKey} key - 확인할 키
 * @returns {void} - 아무 값도 반환하지 않습니다. 단순히 키의 유효성을 확인합니다.
 * @throws {Error} - 키가 유효하지 않을 경우 에러를 throw 합니다.
 */
function assertKey(key: LocalStorageKey): asserts key is LocalStorageKey {
  if (typeof key !== "string" || key.trim() === "") {
    throw new Error("[Error 1 - Key가 유효하지 않습니다.] : 키가 비어 있습니다.");
  }
}

/**
 * 주어진 키가 문자열이고 값이 존재하는지 확인하는 함수
 * @param {LocalStorageKey} key - 확인할 키
 * @param {*} value - 확인할 값
 * @returns {void} - 아무 값도 반환하지 않습니다. 단순히 키와 값의
 * 유효성을 확인합니다.
 * @throws {Error} - 키가 유효하지 않거나 값이 없을 경우 에러를 throw 합니다.
 */
function assertKeyAndValue<K extends string, V>(key: K, value: V): asserts key is K {
  assertKey(key);

  // 값이 없으면 에러를 throw
  if (!value) {
    throw new Error("[Error 2 - value가 유효하지 않습니다.] : value must be a string.");
  }
}

/**
 * 주어진 JSON 문자열을 파싱하여 ParsedData 객체로 반환하는 함수
 * @param {LocalStorageKey} jsonString - 파싱할 JSON 문자열
 * @returns {ParsedData | null} - 파싱된 ParsedData 객체 또는 null을 반환합니다.
 */
function parseJsonData(jsonString: string) {
  try {
    // 주어진 JSON 문자열을 파싱하여 ParsedData 객체로 반환
    const parsedData = JSON.parse(jsonString);
    return parsedData;
  } catch (error) {
    // 에러 발생 시 에러를 콘솔에 출력하고 null 반환
    console.error("JSON 파싱 에러:", error);
    return null;
  }
}

/**
 * 주어진 데이터를 JSON 문자열로 변환하는 함수
 * @param {*} data - JSON으로 변환할 데이터
 * @returns {string} - 변환된 JSON 문자열
 * @throws {Error} - 데이터가 undefined 또는 null인 경우 에러를 throw 합니다.
 */
function stringifyJsonData<T>(data: T): string {
  // 데이터가 undefined 또는 null이면 에러를 throw
  if (data === undefined || data === null) {
    throw new Error("[Error 3 - 데이터 갱신에 실패하였습니다.] : undefined or null.");
  }

  // 주어진 데이터를 JSON 문자열로 변환하여 반환
  const stringifiedData = JSON.stringify(data);
  return stringifiedData;
}

// 기존 함수들을 사용하는 방식과 동일하게 동작하는 모듈 객체를 생성합니다.
export default {
  get,
  set,
  delete: _delete,
};
