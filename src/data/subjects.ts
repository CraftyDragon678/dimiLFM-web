export const subjects = ['국어', '영어', '수학', '사회', '과학', '공업일반', '기초제도', '회계원리', '상업경제', '생활서비스', '인간발달'] as const;
export type SubjectTuple = typeof subjects;
export type Subject = SubjectTuple[number];
