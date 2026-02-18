/**
 * 分类数据配置
 */
export const billCategoryData = {
  pay: [
    {
      type: 'food',
      name: '餐饮美食',
      list: [
        { type: 'food', name: '餐饮' },
        { type: 'drinks', name: '酒水饮料' },
        { type: 'dessert', name: '甜品零食' },
      ]
    },
    {
      type: 'transportation',
      name: '交通出行',
      list: [
        { type: 'transportation', name: '公共交通' },
        { type: 'longdistance', name: '长途交通' },
      ]
    },
    {
      type: 'travel',
      name: '旅行度假',
      list: [
        { type: 'travel', name: '旅行' },
      ]
    },
    {
      type: 'shopping',
      name: '购物消费',
      list: [
        { type: 'shopping', name: '购物' },
        { type: 'clothes', name: '服饰鞋包' },
        { type: 'electronics', name: '数码电子' },
      ]
    },
    {
      type: 'entertainment',
      name: '休闲娱乐',
      list: [
        { type: 'entertainment', name: '休闲娱乐' },
      ]
    },
    {
      type: 'daily',
      name: '居家生活',
      list: [
        { type: 'supplies', name: '日常用品' },
        { type: 'books', name: '图书学习' },
        { type: 'health', name: '医疗健康' },
      ]
    },
  ],
  income: [
    {
      type: 'salary',
      name: '工资薪酬',
      list: [
        { type: 'salary', name: '工资' },
        { type: 'bonus', name: '奖金' },
      ]
    },
    {
      type: 'other',
      name: '其他收入',
      list: [
        { type: 'allowance', name: '补贴津贴' },
        { type: 'parttime', name: '兼职收入' },
      ]
    },
  ]
};

/**
 * 生成 useFor -> 中文名 的映射表
 */
export const billTypeToName = {};

Object.keys(billCategoryData).forEach(key => {
  billCategoryData[key].forEach(group => {
    group.list.forEach(item => {
      billTypeToName[item.type] = item.name;
    });
  });
});

/**
 * 获取分类中文名
 */
export const getCategoryName = (useFor) => {
  return billTypeToName[useFor] || useFor;
};
