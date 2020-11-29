export const normalTags = ['옷', '학용품', '전자기기', '택배', '액세서리', '책', '교과서', '문제집', '기타'] as const;
export const sellTags = ['옷', '학용품', '전자기기', '부품', '액세서리', '기타'] as const;
export const libraryTags = ['책', '문제집', '교과서', '단어장', '공책', '플래너', '기타'] as const;

export type NormalTagTuple = typeof normalTags;
export type NormalTag = NormalTagTuple[number];
export type SellTagTuple = typeof sellTags;
export type SellTag = SellTagTuple[number];
export type LibraryTagTuple = typeof libraryTags;
export type LibraryTag = LibraryTagTuple[number];

export type TagTuple = NormalTagTuple | SellTagTuple | LibraryTagTuple;
export type Tag = NormalTag | SellTag | LibraryTag;
