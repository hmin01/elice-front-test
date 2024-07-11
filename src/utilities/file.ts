/**
 * [Function] 이미지 파일 여부 확인 함수
 * @param filename 파일 이름
 * @returns 이미지 파일 여부
 */
export function isImageFile(filename: string): boolean {
  // 파일 확장자
  const extension: string = getExtension(filename);
  // 이미지 파일 여부 판단 및 반환
  return ["gif", "jpeg", "jpg", "png"].includes(extension);
}
/**
 * [Function] 편집 불가 여부 확인 함수
 * @param filename 파일 이름
 * @returns 편집 불가 여부
 */
export function isNotEditable(filename: string): boolean {
  // 파일 확장자
  const extension: string = getExtension(filename);
  // 편집 불가 여부 판단 및 반환
  return ["bmp", "clip", "doc", "docx", "hwp", "pdf", "psd", "sai", "tga", "tif", "tiff", "xlsx"].includes(extension);
}
/**
 * [Function] 파일 확장자 추출 함수
 * @param filename 파일 이름
 * @returns 파일 확장자
 */
export function getExtension(filename: string): string {
  return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
}
