const dateController = {};

dateController.formatDate = (req, res, next) => {
  try {
    let modifiedDate;
    // convert back to date obj
    if (req.query.date) {
      modifiedDate = new Date(req.query.date);
    } else {
      modifiedDate = new Date(req.body.modifiedDate);
    }
    // format date to sql specs for querying date ranges
    const year = modifiedDate.getFullYear();
    const month = modifiedDate.getMonth();
    let day = modifiedDate.getDate();
    if (day.length === 1) {
      day = 0 + day;
    }
    const date = `${year}-${month}-${day}`;
    if (req.query.date) {
      req.query.date = date;
    } else {
      req.body.modifiedDate = date;
    }

    return next();
  } catch (err) {
    return next({
      log: `dateController.formatDate: ${err}`,
      message: { err: "Failed to format date" },
    });
  }
};

dateController.getDateRanges = (req, res, next) => {
  try {
    const startDate = req.query.date.slice(0, 8) + "01";
    let endMonth = Number(req.query.date.slice(5, 7));
    if (endMonth === 12) {
      endMonth = "01";
    } else if (endMonth < 10) {
      endMonth += 1;
      endMonth = "0" + endMonth;
    } else {
      endMonth = endMonth + 1;
    }
    const endDate = req.query.date.slice(0, 5) + endMonth + "01";
    req.query.dateRange = { startDate, endDate };
    return next();
  } catch (err) {
    return next({
      log: `dateController.formatDate: ${err}`,
      message: { err: "Failed to format date" },
    });
  }
};
module.exports = dateController;
