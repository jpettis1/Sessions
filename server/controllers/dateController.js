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
    let month = modifiedDate.getMonth() + 1;
    console.log("month", month);
    let day = modifiedDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const date = `${year}-${month}-${day}`;
    if (req.query.date) {
      req.query.date = date;
    } else {
      req.body.modifiedDate = date;
    }
    console.log(date);
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
    // console.log("req query date", req.query.date);
    // const startDate = req.query.date.slice(0, 8) + "01";
    const date = new Date(req.query.date);
    const year = date.getFullYear();
    let endYear = year;
    let month = date.getMonth() + 1;
    let endMonth = month + 1;
    console.log("end month", endMonth);
    if (endMonth > 12) {
      endMonth = "01";
      endYear += 1;
    } else if (endMonth < 10) {
      endMonth = "0" + endMonth;
      console.log("end month!!", endMonth);
    }
    if (month < 10) {
      month = "0" + month;
    }
    const startDate = year + "-" + month + "-" + "01";
    const endDate = endYear + "-" + endMonth + "-" + "01";
    console.log("start and end dates ", startDate, endDate);
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
