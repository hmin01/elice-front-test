/**
 * [Function] 클래스 이름 생성 함수
 * @param classes 클래스 이름 요소
 * @returns 클래스 이름
 */
export function setClassName(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
