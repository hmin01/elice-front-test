/**
 * [Function] 파일 확장자 추출 함수
 * @param filename 파일 이름
 * @returns 파일 확장자
 */
export function getExtension(filename: string): string {
  return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
}
