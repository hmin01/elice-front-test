/**
 * [Function] JSON 변환 함수
 * @param preObj 변환하고자 하는 객체 변수
 * @returns 변환된 객체 변수
 */
export function transformToJSON(preObj: any): any {
  // 결과 객체
  const result: any = {};
  // 분석해야 하는 키(Key) 목록
  const keys: string[] = Object.keys(preObj);

  for (let i = 0; i < keys.length; i++) {
    // 서브 키(Sub key) 구분
    const subKeys: string[] = keys[i].split("/");
    // 결과 객체 참조
    let nestedObject: any = result;

    // 하위 키에 대한 처리
    for (let j = 0; j < subKeys.length; j++) {
      // 마지막 하위 레벨인 경우, 값 설정
      if (j === subKeys.length - 1) {
        // 예외 처리
        if (subKeys[j] === "") continue;
        // 데이터 추가
        nestedObject[subKeys[j]] = {
          type: "file",
          file: preObj[keys[i]],
        };
      }
      // 추가적인 하위 레벨이 있을 경우
      else {
        // 키(Key)가 없을 경우, 키에 대한 값 설정
        if (!nestedObject.hasOwnProperty(subKeys[j])) nestedObject[subKeys[j]] = { type: "directory", children: {} };
        // 현재 레벨의 객체 참조
        nestedObject = nestedObject[subKeys[j]].children;
      }
    }
  }
  // 결과 반환
  return result;
}
