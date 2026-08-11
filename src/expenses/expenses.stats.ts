const WEEKDAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export interface ExpenseForStats {
  price: number;
  date: Date;
  categoryId: number;
  category: { name: string };
}

export interface ExpenseStats {
  total: number;
  count: number;
  averagePerExpense: number;
  averagePerActiveDay: number;
  busiestWeekday: { weekday: string; total: number } | null;
  byCategory: { categoryId: number; categoryName: string; total: number }[];
  advice: string[];
}

export function buildExpenseStats(expenses: ExpenseForStats[]): ExpenseStats {
  const total = round2(expenses.reduce((sum, e) => sum + e.price, 0));
  const count = expenses.length;

  if (count === 0) {
    return {
      total: 0,
      count: 0,
      averagePerExpense: 0,
      averagePerActiveDay: 0,
      busiestWeekday: null,
      byCategory: [],
      advice: ['Aún no tienes gastos registrados en este periodo.'],
    };
  }

  const activeDays = new Set(expenses.map((e) => e.date.toISOString().slice(0, 10)));
  const averagePerExpense = round2(total / count);
  const averagePerActiveDay = round2(total / activeDays.size);

  const byWeekday = new Map<string, number>();
  for (const e of expenses) {
    const weekday = WEEKDAY_NAMES[e.date.getUTCDay()];
    byWeekday.set(weekday, (byWeekday.get(weekday) ?? 0) + e.price);
  }
  const busiestWeekdayEntry = [...byWeekday.entries()].sort((a, b) => b[1] - a[1])[0];
  const busiestWeekday = busiestWeekdayEntry
    ? { weekday: busiestWeekdayEntry[0], total: round2(busiestWeekdayEntry[1]) }
    : null;

  const byCategoryMap = new Map<number, { categoryName: string; total: number }>();
  for (const e of expenses) {
    const current = byCategoryMap.get(e.categoryId);
    if (current) {
      current.total += e.price;
    } else {
      byCategoryMap.set(e.categoryId, { categoryName: e.category.name, total: e.price });
    }
  }
  const byCategory = [...byCategoryMap.entries()]
    .map(([categoryId, v]) => ({ categoryId, categoryName: v.categoryName, total: round2(v.total) }))
    .sort((a, b) => b.total - a.total);

  return {
    total,
    count,
    averagePerExpense,
    averagePerActiveDay,
    busiestWeekday,
    byCategory,
    advice: buildAdvice({ total, busiestWeekday, byCategory }),
  };
}

function buildAdvice(stats: {
  total: number;
  busiestWeekday: { weekday: string; total: number } | null;
  byCategory: { categoryName: string; total: number }[];
}): string[] {
  const advice: string[] = [];

  const topCategory = stats.byCategory[0];
  if (topCategory && stats.total > 0) {
    const share = topCategory.total / stats.total;
    if (share >= 0.4) {
      advice.push(
        `Más del ${Math.round(share * 100)}% de tu gasto está concentrado en "${topCategory.categoryName}"; considera ponerle un tope mensual a esa categoría.`,
      );
    }
  }

  if (stats.busiestWeekday && stats.total > 0) {
    const share = stats.busiestWeekday.total / stats.total;
    if (share >= 0.3) {
      advice.push(
        `Los ${stats.busiestWeekday.weekday.toLowerCase()} concentran buena parte de tu gasto; revisa si hay compras que puedas planear con anticipación ese día.`,
      );
    }
  }

  if (advice.length === 0) {
    advice.push('Tu gasto está repartido de forma pareja, sigue así.');
  }

  return advice;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
