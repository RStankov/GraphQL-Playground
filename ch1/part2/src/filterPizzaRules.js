const PIZZA_FILTER_RULES = {
  nameContains: value => ({ name: { $regex: value } }),
  likesMoreThan: value => ({ likesCount: { $gte: value } }),
  likesLessThan: value => ({ likesCount: { $lt: value } }),
  priceCentsMoreThan: value => ({ priceCents: { $gte: value } }),
  priceCentsLessThan: value => ({ priceCents: { $lt: value } }),
};

function applyFilters(filters = {}, rules) {
  if (!filters) {
    return {};
  }

  return Object.keys(filters).reduce((where, filterName) => {
    if (!rules[filterName]) {
      return where;
    }
    const value = filters[filterName];
    const conditions = rules[filterName](value);
    return Object.keys(conditions).reduce((where, fieldName) => {
      where[fieldName] = Object.assign(
        where[fieldName] || {},
        conditions[fieldName],
      );
      return where;
    }, where);
  }, {});
}

module.exports = function filterPizzaRules(filters) {
  return applyFilters(filters, PIZZA_FILTER_RULES);
};
