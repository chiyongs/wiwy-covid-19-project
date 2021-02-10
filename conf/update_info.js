const update_info = {
  isUpdate: false,
  didUpdate: function () {
    update_info.isUpdate = true;
  },
  clrUpdate: function () {
    update_info.isUpdate = false;
  },
};

module.exports = update_info;
