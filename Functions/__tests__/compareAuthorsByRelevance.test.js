import { sortAuthorsByRelevance } from '../functions.js';

describe('sortAuthorsByRelevance', () => {
  // 1. Тест на нормальные данные (Классы хороших данных)
  test('should return -1 when first author has more posts than second', () => {
    const a = { posts: 10, likes: 5 };
    const b = { posts: 8, likes: 5 };
    expect(sortAuthorsByRelevance(a, b)).toBe(-1);
  });

  // 2. Тест на граничные значения ( Анализ граничных условий )
  test('should return -1 when authors have equal posts but first has more likes', () => {
    const a = { posts: 10, likes: 6 };
    const b = { posts: 10, likes: 5 };
    expect(sortAuthorsByRelevance(a, b)).toBe(-1);
  });

  // 3. Тест на равные значения (  Анализ граничных условий )
  test('should return 0 when authors have equal posts and likes', () => {
    const a = { posts: 10, likes: 5 };
    const b = { posts: 10, likes: 5 };
    expect(sortAuthorsByRelevance(a, b)).toBe(0);
  });

  // 4. Тест на противоположные данные (Классы хороших данных)
  test('should return 1 when second author has more posts than first', () => {
    const a = { posts: 5, likes: 5 };
    const b = { posts: 10, likes: 5 };
    expect(sortAuthorsByRelevance(a, b)).toBe(1);
  });

  // 5. Тест на экзотические данные ( Анализ граничных условий)
  test('should return 0 when both authors have 0 posts and 0 likes', () => {
    const a = { posts: 0, likes: 0 };
    const b = { posts: 0, likes: 0 };
    expect(sortAuthorsByRelevance(a, b)).toBe(0);
  });

  // 6. Тест на большое количество данных (  Классы плохих данных )
  test('should return -1 when first author has significantly more posts', () => {
    const a = { posts: 1_000_000, likes: 10 };
    const b = { posts: 999_999, likes: 20 };
    expect(sortAuthorsByRelevance(a, b)).toBe(-1);
  });

  // 7. Тест на негативные значения (Классы плохих данных)
  test('should return 1 when second author has higher posts despite negative likes', () => {
    const a = { posts: -5, likes: -5 };
    const b = { posts: -3, likes: -10 };
    expect(sortAuthorsByRelevance(a, b)).toBe(1);
  });

  // 8. Тест на отсутствующие поля (Классы плохих данных)
  test('should return 0 when posts and likes are undefined for both authors', () => {
    const a = {};
    const b = {};
    expect(sortAuthorsByRelevance(a, b)).toBe(0);
  });
});
