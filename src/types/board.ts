export type NormalBoard = 'found' | 'lost' | 'market';
export type BookBoard = 'book';
export type Board = NormalBoard | BookBoard;

export const boardShortTexts: { [key in Board]: string } = {
  book: '디미 서점',
  found: '찾아가세요',
  lost: '찾아주세요',
  market: '판매합니다',
};

export const boardTexts: { [key in Board]: string } = {
  book: '디미 서점',
  found: '분실물 찾아가세요',
  lost: '분실물 찾아주세요',
  market: '판매합니다',
};

export const boardKeys = ['found', 'lost', 'market', 'book'] as Board[];
