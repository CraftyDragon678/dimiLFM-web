export const libraryTags = ['책', '교과서', '문제집'] as const;

export const normalTags = ['옷', '학용품', '전자기기', '택배', '액세서리', '기타'] as const;

export type LibraryTag = typeof libraryTags[number];
export type NormalTag = typeof normalTags[number];
export type Tag = LibraryTag | NormalTag;

export default [...libraryTags, ...normalTags] as const;
